import { di } from "@/modules/di";
import { SchoolYearId } from "@/modules/domain/SchoolYear/Identifier";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";

export const appConfigRouter = createTRPCRouter({
  get: publicProcedure.query(async () => {
    const appConfigs = await di.cradle.prisma.appConfig.findMany();
    if (appConfigs.length !== 1) {
      throw new TRPCError({
        message: "Failed to load app config",
        code: "INTERNAL_SERVER_ERROR",
      });
    }
    const appConfig = appConfigs[0];
    const schoolYear = await di.cradle.schoolYearRepository.findById(
      new SchoolYearId(appConfig.schoolYearId),
    );
    if (schoolYear == null) {
      throw new TRPCError({
        message: "Could not find a school year",
        code: "INTERNAL_SERVER_ERROR",
      });
    }
    return { schoolYear };
  }),
});
