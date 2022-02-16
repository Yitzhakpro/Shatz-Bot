import "dotenv/config";
import { ShatzBotClient } from "./client";

const bot = new ShatzBotClient();

bot.start();
