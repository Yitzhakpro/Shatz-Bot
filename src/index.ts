import "dotenv/config";
import { connectToDb, shatzBot } from "./loaders";
import { logger } from "./logger";

connectToDb()
  .then(() => {
    logger.info("Connected to DB.");
    shatzBot.start();
  })
  .catch((error) => {
    logger.error(error, "Failed to connect to DB");
  });
