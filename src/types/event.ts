import {
  ClientEvents,
  Client,
  Awaitable,
  Interaction,
  CacheType,
} from "discord.js";

// TODO: orginize event types

export type Event = {
  name: keyof ClientEvents;
  once?: boolean;
  execute: (...args: any) => any;
};

export type BotEvent = {
  execute: (client: Client) => Awaitable<any>;
} & Event;

export type InteractionCreateEvent = {
  name: "interactionCreate";
  execute: (interaction: Interaction<CacheType>) => Awaitable<any>;
};
