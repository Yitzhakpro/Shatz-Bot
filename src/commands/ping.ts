import { SlashCommandBuilder } from "@discordjs/builders";
import { Command } from "../types";

const ping: Command = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with pong"),
  async execute(interaction) {
    await interaction.reply("Pong");
  },
};

export default ping;
