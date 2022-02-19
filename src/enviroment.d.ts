export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      botToken: string;
      guildId: string;
      appId: string;
      armyManageUserIds: string;

      DATABASE_URL: string;

      enviroment: "dev" | "prod" | "debug";
    }
  }
}
