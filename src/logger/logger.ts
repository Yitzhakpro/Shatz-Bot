import pino, { LoggerOptions } from "pino";

const pinoOptions: LoggerOptions = {
  ...(process.env.enviroment !== "prod"
    ? { transport: { target: "pino-pretty" } }
    : {}),
};

const logger = pino(pinoOptions);

export { logger };
