import { SlashCommandBuilder } from "@discordjs/builders";
import { logger } from "../../logger";
import { Command } from "../../types";

const onlineCount: Command = {
  data: new SlashCommandBuilder()
    .setName("online")
    .setDescription("Replies with how much players are online"),
  async execute(interaction) {
    try {
      const fetchedMembers = await interaction.guild?.members.fetch();
      const totalOnline = fetchedMembers?.filter(
        (member) => member.presence?.status === "online"
      );

      await interaction.reply({
        content: `There are currently ${totalOnline?.size} members online in this server`,
        ephemeral: true,
      });
    } catch (error) {
      logger.error(error, "failed to fetch members/online members");
    }
  },
};

export default onlineCount;
