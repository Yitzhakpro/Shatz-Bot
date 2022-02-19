export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      botToken: string;
      guildId: string;
      appId: string;
      armyManageUserIds: string;
      enviroment: "dev" | "prod" | "debug";
    }
  }
}
