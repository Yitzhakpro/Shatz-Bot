import { ShatzBotClient } from "../client";

const createShatzBot = () => {
  const bot = new ShatzBotClient();

  return bot;
};

const shatzBot = createShatzBot();

export default shatzBot;
