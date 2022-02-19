import { SlashCommandBuilder } from "@discordjs/builders";
import { getRepository } from "typeorm";
import { Soldier } from "../../entities";
import { Command } from "../../types";

const pazamBattle: Command = {
  data: new SlashCommandBuilder()
    .setName("pazam-battle")
    .setDescription("Pazam battle with another player")
    .addUserOption((option) =>
      option
        .setName("opponent")
        .setDescription("Opponent you want to pazam battle with")
        .setRequired(true)
    ),
  async execute(interaction) {
    const soldierRepository = getRepository(Soldier);

    const initiatedUserId = interaction.member?.user.id;
    const opponentId = interaction.options.getUser("opponent")?.id;

    const initiatedUser = await soldierRepository.findOne({
      id: initiatedUserId,
    });

    if (!initiatedUser) {
      return await interaction.reply({
        content: "Please ask an admin to add your info to the system",
        ephemeral: true,
      });
    }

    const opponentInfo = await soldierRepository.findOne({ id: opponentId });

    if (!opponentInfo) {
      return await interaction.reply({
        content: "Your opponent doesnt have info in the system",
        ephemeral: true,
      });
    }

    const ownDraftDate = new Date(initiatedUser.draftDate);
    const opponentDraftDate = new Date(opponentInfo.draftDate);

    if (ownDraftDate < opponentDraftDate) {
      await interaction.reply(
        `${interaction.member?.user} defeted ${interaction.options.getUser(
          "opponent"
        )} in pazam battle`
      );
    } else if (ownDraftDate > opponentDraftDate) {
      await interaction.reply(
        `${interaction.member?.user} lost to ${interaction.options.getUser(
          "opponent"
        )} in pazam battle`
      );
    } else {
      await interaction.reply(
        `${
          interaction.member?.user
        } has the same PAZAM as ${interaction.options.getUser("opponent")}`
      );
    }
  },
};

export default pazamBattle;
