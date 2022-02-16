import { Client, Collection } from "discord.js";

export class ShatzBotClient extends Client {
  commands: Collection<string, any> = new Collection();

  constructor() {
    super({ intents: 32767 });
  }

  start() {
    this.login(process.env.botToken);
  }
}
