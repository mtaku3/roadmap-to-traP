import { PrismaClient } from "@prisma/client";
import { InjectionMode, asClass, asFunction, createContainer } from "awilix";
import { IUserRepository } from "./domain/User/IRepository";
import { UserRepository } from "./infra/prisma/User/Repository";
import { UserController } from "./application/User/Controller";
import { env } from "@/env.mjs";

const container = createContainer<{
  prisma: PrismaClient;
  userRepository: IUserRepository;
  userController: UserController;
}>({
  injectionMode: InjectionMode.CLASSIC,
  strict: true,
});

container.register({
  prisma: asFunction(() => new PrismaClient()).singleton(),
});

container.register({
  userRepository: asClass(UserRepository).singleton(),

  userController: asClass(UserController).singleton(),
});

export const di = container;
