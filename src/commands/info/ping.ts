import { SlashCommandBuilder } from "@discordjs/builders";
import { Command } from "../../types";

const ping: Command = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with pong"),
  async execute(interaction) {
    const msPassed = Date.now() - interaction.createdTimestamp;

    const pongMessage = `Pong, latency: ${msPassed} ms, Bot's ping: ${interaction.client.ws.ping}`;
    await interaction.reply({ content: pongMessage, ephemeral: true });
  },
};

export default ping;
