import { SlashCommandBuilder } from "@discordjs/builders";
import { getRepository } from "typeorm";
import { Soldier } from "../../entities";
import { Command } from "../../types";

const addSoldierPermissions = JSON.parse(process.env.armyManageUserIds!).map(
  (userId: string) => {
    return {
      id: userId,
      type: "USER",
      permission: true,
    };
  }
);

const addsoldier: Command = {
  data: new SlashCommandBuilder()
    .setName("addsoldier")
    .setDescription("Adds soldier to the system")
    .setDefaultPermission(false)
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("User to add to system")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("display-name")
        .setDescription("Display name of the soldier")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("draft-date")
        .setDescription("Draft date of the soldier")
        .setRequired(true)
    ),
  userPermission: addSoldierPermissions,
  async execute(interaction) {
    const userToAdd = interaction.options.getUser("user");
    const displayName = interaction.options.getString("display-name");
    const draftDate = interaction.options.getString("draft-date");

    if (!userToAdd || !displayName || !draftDate) return;

    const splitedDate = draftDate?.split("/");

    const soldierRepository = getRepository(Soldier);

    const newSoldier = new Soldier();
    newSoldier.id = userToAdd.id;
    newSoldier.name = displayName;
    newSoldier.draftDate = new Date(
      parseInt(splitedDate[2]),
      parseInt(splitedDate[1]) - 1,
      parseInt(splitedDate[0])
    ).toLocaleDateString("he-IL");

    const addedSoldier = await soldierRepository.save(newSoldier);

    await interaction.reply({
      content: `${addedSoldier.draftDate} - ${addedSoldier.name} has been added to the system`,
      ephemeral: true,
    });
  },
};

export default addsoldier;
