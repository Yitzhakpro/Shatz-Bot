import "reflect-metadata";
import { createConnection } from "typeorm";
import { Soldier } from "../entities";

export const connectToDb = async () => {
  const connection = await createConnection({
    type: "postgres",
    url: process.env.DATABASE_URl,
    entities: [Soldier],
  });
};
