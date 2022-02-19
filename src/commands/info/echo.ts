import { SlashCommandBuilder } from "@discordjs/builders";
import { Command } from "../../types";

const echo: Command = {
  data: new SlashCommandBuilder()
    .setName("echo")
    .setDescription("Replies with your input!")
    .addStringOption((option) =>
      option
        .setName("input")
        .setDescription("The input to echo back")
        .setRequired(true)
    ),
  async execute(interaction) {
    const userInput = interaction.options.getString("input");

    await interaction.reply({ content: userInput, ephemeral: true });
  },
};

export default echo;
