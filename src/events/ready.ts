import { BotEvent } from "../types";
import { logger } from "../logger";

const readyEvent: BotEvent = {
  name: "ready",
  once: true,
  execute(client) {
    logger.info(`Bot is ready, logged in as: ${client?.user?.tag}`);
  },
};

export default readyEvent;
