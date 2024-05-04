import { PrismaClient } from "@prisma/client";
import { InjectionMode, asClass, asFunction, createContainer } from "awilix";
import { IUserRepository } from "./domain/User/IRepository";
import { UserRepository } from "./infra/prisma/User/Repository";
import { UserController } from "./application/User/Controller";
import { MeApiFactory } from "./external/traq/api/me-api";
import { EventsApiFactory } from "./external/knoq/api/events-api";
import { UserApiFactory } from "./external/traq/api/user-api";
import { Configuration } from "./external/traq/configuration";
import { env } from "@/env.mjs";

const container = createContainer<{
  prisma: PrismaClient;
  traqMeApi: ReturnType<typeof MeApiFactory>;
  traqUserApi: ReturnType<typeof UserApiFactory>;
  knoqEventsApi: ReturnType<typeof EventsApiFactory>;

  userRepository: IUserRepository;
  userController: UserController;
}>({
  injectionMode: InjectionMode.CLASSIC,
  strict: true,
});

const traqConfig = new Configuration({
  accessToken: env.TRAQ_BOT_ACCESS_TOKEN,
});

container.register({
  prisma: asFunction(() => new PrismaClient()).singleton(),
  traqMeApi: asFunction(() => MeApiFactory(traqConfig)).singleton(),
  traqUserApi: asFunction(() => UserApiFactory(traqConfig)).singleton(),
  knoqEventsApi: asFunction(() => EventsApiFactory()).singleton(),
});

container.register({
  userRepository: asClass(UserRepository).singleton(),

  userController: asClass(UserController).singleton(),
});

export const di = container;
