import { SlashCommandBuilder } from "@discordjs/builders";
import { Command } from "../types";

const beep: Command = {
  data: new SlashCommandBuilder()
    .setName("beep")
    .setDescription("Replies with boop"),
  async execute(interaction) {
    await interaction.reply("boop");
  },
};

export default beep;
