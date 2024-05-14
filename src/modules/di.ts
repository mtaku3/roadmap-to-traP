import { PrismaClient } from "@prisma/client";
import { InjectionMode, asClass, asFunction, createContainer } from "awilix";
import { IUserRepository } from "./domain/User/IRepository";
import { UserRepository } from "./infra/prisma/User/Repository";
import { UserController } from "./application/User/Controller";
import { MeApiFactory } from "./external/traq/api/me-api";
import { EventsApiFactory } from "./external/knoq/api/events-api";
import { UserApiFactory } from "./external/traq/api/user-api";
import { Configuration as TraqConfiguration } from "./external/traq/configuration";
import { Configuration as KnoqConfiguration } from "./external/knoq/configuration";
import { env } from "@/env";
import { setupCache } from "axios-cache-interceptor";
import Axios from "axios";
import { IWorkshopRepository } from "./domain/Workshop/IRepository";
import { WorkshopController } from "./application/Workshop/Controller";
import { WorkshopRepository } from "./infra/prisma/Workshop/Repository";
import { ISchoolYearRepository } from "./domain/SchoolYear/IRepository";
import { SchoolYearRepository } from "./infra/prisma/SchoolYear/Repository";
import { SchoolYearController } from "./application/SchoolYear/Controller";
import { knoqAuthorizer } from "./knoqAuthorizer";

const container = createContainer<{
  prisma: PrismaClient;
  traqMeApi: ReturnType<typeof MeApiFactory>;
  traqUserApi: ReturnType<typeof UserApiFactory>;
  knoqEventsApi: ReturnType<typeof EventsApiFactory>;

  userRepository: IUserRepository;
  workshopRepository: IWorkshopRepository;
  schoolYearRepository: ISchoolYearRepository;

  userController: UserController;
  workshopController: WorkshopController;
  schoolYearController: SchoolYearController;
}>({
  injectionMode: InjectionMode.CLASSIC,
  strict: true,
});

const traqAxios = setupCache(Axios.create());
const knoqAxios = knoqAuthorizer(setupCache(Axios.create()));

const traqConfig = new TraqConfiguration({
  accessToken: env.TRAQ_BOT_ACCESS_TOKEN,
});

container.register({
  prisma: asFunction(() => new PrismaClient()).singleton(),
  traqMeApi: asFunction(() =>
    MeApiFactory(traqConfig, undefined, traqAxios),
  ).singleton(),
  traqUserApi: asFunction(() =>
    UserApiFactory(traqConfig, undefined, traqAxios),
  ).singleton(),
  knoqEventsApi: asFunction(() =>
    EventsApiFactory(undefined, undefined, knoqAxios),
  ).singleton(),
});

container.register({
  userRepository: asClass(UserRepository).singleton(),
  workshopRepository: asClass(WorkshopRepository).singleton(),
  schoolYearRepository: asClass(SchoolYearRepository).singleton(),

  userController: asClass(UserController).singleton(),
  workshopController: asClass(WorkshopController).singleton(),
  schoolYearController: asClass(SchoolYearController).singleton(),
});

export const di = container;
