import { SlashCommandBuilder } from "@discordjs/builders";
import { getRepository } from "typeorm";
import { Soldier } from "../../entities";
import { Command } from "../../types";

const removeSoldierPermissions = JSON.parse(process.env.armyManageUserIds!).map(
  (userId: string) => {
    return {
      id: userId,
      type: "USER",
      permission: true,
    };
  }
);

const removeSoldier: Command = {
  data: new SlashCommandBuilder()
    .setName("removesoldier")
    .setDescription("Removes soldier from the system")
    .setDefaultPermission(false)
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("User to remove from the system")
        .setRequired(true)
    ),
  userPermission: removeSoldierPermissions,
  async execute(interaction) {
    const userToRemove = interaction.options.getUser("user");

    if (!userToRemove) return;

    const soldierRepository = getRepository(Soldier);

    const deleteResult = await soldierRepository.delete({
      id: userToRemove.id,
    });

    if (deleteResult.affected && deleteResult.affected > 0) {
      await interaction.reply({
        content: `${userToRemove.username} has been removed from the system`,
        ephemeral: true,
      });
    } else {
      await interaction.reply({
        content: `${userToRemove.username} is not in the system`,
        ephemeral: true,
      });
    }
  },
};

export default removeSoldier;
