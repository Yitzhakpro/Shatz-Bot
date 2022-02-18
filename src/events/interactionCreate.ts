import { shatzBot } from "../loaders";
import { InteractionCreateEvent } from "../types";

const interactionCreateEvent: InteractionCreateEvent = {
  name: "interactionCreate",
  async execute(interaction) {
    if (!interaction.isCommand()) return;

    const command = shatzBot.commands.get(interaction.commandName);

    if (!command) return;

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
  },
};

export default interactionCreateEvent;
