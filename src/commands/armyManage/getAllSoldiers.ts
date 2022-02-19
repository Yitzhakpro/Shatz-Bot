import { SlashCommandBuilder } from "@discordjs/builders";
import { getRepository } from "typeorm";
import { Soldier } from "../../entities";
import { Command } from "../../types";

const getAllSoldierPermissions = JSON.parse(process.env.armyManageUserIds!).map(
  (userId: string) => {
    return {
      id: userId,
      type: "USER",
      permission: true,
    };
  }
);

const getAllSoldiers: Command = {
  data: new SlashCommandBuilder()
    .setName("getallsoldiers")
    .setDescription("Returns all soldiers in the system")
    .setDefaultPermission(false),
  userPermission: getAllSoldierPermissions,
  async execute(interaction) {
    const soldierRepository = getRepository(Soldier);

    const soldiers = await soldierRepository.find();

    let finalResult = "All Soldiers:\n";
    for (const solider of soldiers) {
      finalResult += `${solider.id} - ${solider.name} - ${solider.draftDate}\n`;
    }

    await interaction.reply({
      content: finalResult,
      ephemeral: true,
    });
  },
};

export default getAllSoldiers;
