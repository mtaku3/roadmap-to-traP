import { PrismaClient } from "@prisma/client";
import { UserRepository } from "./infra/prisma/User/Repository";
import { UserController } from "./application/User/Controller";
import { MeApiFactory } from "./external/traq/api/me-api";
import { EventsApiFactory } from "./external/knoq/api/events-api";
import { UserApiFactory } from "./external/traq/api/user-api";
import { Configuration as TraqConfiguration } from "./external/traq/configuration";
import { env } from "@/env";
import { setupCache } from "axios-cache-interceptor";
import Axios from "axios";
import { WorkshopController } from "./application/Workshop/Controller";
import { WorkshopRepository } from "./infra/prisma/Workshop/Repository";
import { SchoolYearRepository } from "./infra/prisma/SchoolYear/Repository";
import { SchoolYearController } from "./application/SchoolYear/Controller";
import { knoqAuthorizer } from "./knoqAuthorizer";

const prisma = new PrismaClient({
  log:
    env.NODE_ENV === "production"
      ? ["warn", "error"]
      : ["query", "info", "warn", "error"],
});

const traqAxios = setupCache(Axios.create());
const traqConfig = new TraqConfiguration({
  accessToken: env.TRAQ_BOT_ACCESS_TOKEN,
});
const traqMeApi = MeApiFactory(traqConfig, undefined, traqAxios);
const traqUserApi = UserApiFactory(traqConfig, undefined, traqAxios);

const knoqAxios = knoqAuthorizer(setupCache(Axios.create()));
const knoqEventsApi = EventsApiFactory(undefined, undefined, knoqAxios);

const userRepository = new UserRepository(prisma);
const workshopRepository = new WorkshopRepository(prisma, knoqEventsApi);
const schoolYearRepository = new SchoolYearRepository(prisma);

const userController = new UserController(userRepository);
const workshopController = new WorkshopController(workshopRepository);
const schoolYearController = new SchoolYearController(schoolYearRepository);

export const di = {
  cradle: {
    prisma,
    traqMeApi,
    traqUserApi,
    knoqEventsApi,
    userRepository,
    workshopRepository,
    schoolYearRepository,
    userController,
    workshopController,
    schoolYearController,
  },
};
