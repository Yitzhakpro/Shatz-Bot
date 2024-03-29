import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, CacheType } from "discord.js";

export type Command = {
  data: Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">;
  userPermission?: any;
  execute: (interaction: CommandInteraction<CacheType>) => Promise<any>;
};
