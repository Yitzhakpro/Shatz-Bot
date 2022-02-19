import { SlashCommandBuilder } from "@discordjs/builders";
import { Command } from "../../types";

const ping: Command = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with pong"),
  async execute(interaction) {
    const pingingMessage = await interaction.reply({
      content: "Pinging...",
      fetchReply: true,
      ephemeral: true,
    });

    interaction.editReply(
      `Latency: ${
        // @ts-ignore
        pingingMessage.createdTimestamp - interaction.createdTimestamp
      }ms`
    );
  },
};

export default ping;
