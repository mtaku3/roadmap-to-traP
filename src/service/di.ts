import { InjectionMode, asClass, asFunction, createContainer } from "awilix";
import { UserRepository } from "./infra/prisma/User/Repository";
import { PrismaClient } from "@prisma/client";
import { IUserRepository } from "./domain/User/IRepository";

const container = createContainer<{
  prisma: PrismaClient;
  userRepository: IUserRepository;
}>({
  injectionMode: InjectionMode.CLASSIC,
  strict: true,
}).register({
  prisma: asFunction(() => new PrismaClient()).singleton(),
  userRepository: asClass(UserRepository).singleton(),
});

export { container as di };
