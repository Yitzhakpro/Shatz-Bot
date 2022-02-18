import { Client, Collection } from "discord.js";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import { globPromise } from "../utils";
import { Command } from "../types";
import { logger } from "../logger";

export class ShatzBotClient extends Client {
  commands: Collection<string, Command> = new Collection();

  constructor() {
    super({ intents: 32767 });
  }

  async registerModules() {
    try {
      const commandFilesPaths = await globPromise(
        `${__dirname}/../commands/**/*{.ts,.js}`
      );

      const filteredCommandFilesPaths = commandFilesPaths.filter((filePath) => {
        return filePath.endsWith(".ts") || filePath.endsWith(".js");
      });

      filteredCommandFilesPaths.forEach((commandFilePath) => {
        const command: Command = require(commandFilePath).default;

        this.commands.set(command.data.name, command);
      });

      this.registerCommands();
    } catch (error) {
      logger.error(error, "Could not load commands");
      process.exit(1);
    }
  }

  registerCommands() {
    const token = process.env.botToken!;
    const guildId = process.env.guildId!;
    const appId = process.env.appId!;
    const rest = new REST({ version: "9" }).setToken(token);

    const commands: any[] = [];
    this.commands.forEach((command) => {
      const commandJson = command.data.toJSON();
      commands.push(commandJson);
    });

    rest
      .put(Routes.applicationGuildCommands(appId, guildId), {
        body: commands,
      })
      .then(() => {
        logger.info("Registered bot commands");
      })
      .catch((error) => {
        logger.error(error, "Could not register bot commands");
      });
  }

  async start() {
    await this.registerModules();
    this.login(process.env.botToken);
  }
}
