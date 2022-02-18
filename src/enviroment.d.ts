export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      botToken: string;
      guildId: string;
      appId: string;
      enviroment: "dev" | "prod" | "debug";
    }
  }
}
