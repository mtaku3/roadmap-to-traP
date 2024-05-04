import { PrismaClient } from "@prisma/client";
import { InjectionMode, asClass, asFunction, createContainer } from "awilix";
import { IUserRepository } from "./domain/User/IRepository";
import { UserRepository } from "./infra/prisma/User/Repository";
import { UserController } from "./application/User/Controller";
import { MeApiFactory } from "./external/traq/api/me-api";
import { EventsApiFactory } from "./external/knoq/api/events-api";

const container = createContainer<{
  prisma: PrismaClient;
  traqMeApi: ReturnType<typeof MeApiFactory>;
  knoqEventsApi: ReturnType<typeof EventsApiFactory>;

  userRepository: IUserRepository;
  userController: UserController;
}>({
  injectionMode: InjectionMode.CLASSIC,
  strict: true,
});

container.register({
  prisma: asFunction(() => new PrismaClient()).singleton(),
  traqMeApi: asFunction(() => MeApiFactory()).singleton(),
  knoqEventsApi: asFunction(() => EventsApiFactory()).singleton(),
});

container.register({
  userRepository: asClass(UserRepository).singleton(),

  userController: asClass(UserController).singleton(),
});

export const di = container;
