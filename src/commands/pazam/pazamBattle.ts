import { SlashCommandBuilder } from "@discordjs/builders";
import { MessageEmbed } from "discord.js";
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

    const initiatedUserDiscord = interaction.member?.user;
    const initiatedUserId = initiatedUserDiscord?.id;
    const opponentDiscord = interaction.options.getUser("opponent");
    const opponentId = opponentDiscord?.id;

    const initiatedUserInfo = await soldierRepository.findOne({
      id: initiatedUserId,
    });

    if (!initiatedUserInfo) {
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

    const battleResultEmbed = new MessageEmbed()
      .setColor("#0099ff")
      .setTitle('מלחמת פז"מ')
      .setAuthor({ name: 'מלך הפז"מ' })
      .setDescription('מישהו אולי יעלה משפט פז"מ פה...')
      .addFields(
        {
          name: "משתתף 1:",
          value: initiatedUserInfo.name,
          inline: true,
        },
        { name: "משתתף 2:", value: opponentInfo.name, inline: true }
      )
      .setTimestamp();
    const ownDraftDate = new Date(initiatedUserInfo.draftDate);
    const opponentDraftDate = new Date(opponentInfo.draftDate);

    if (ownDraftDate < opponentDraftDate) {
      battleResultEmbed.addField("מנצח: ", initiatedUserInfo.name);
    } else if (ownDraftDate > opponentDraftDate) {
      battleResultEmbed.addField("מנצח: ", opponentInfo.name);
    } else {
      battleResultEmbed.addField("תוצאה: ", `תיקו!!!`);
    }

    await interaction.reply({ embeds: [battleResultEmbed] });
  },
};

export default pazamBattle;
