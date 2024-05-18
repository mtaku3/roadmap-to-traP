import { di } from "@/modules/di";
import { SchoolYearId } from "@/modules/domain/SchoolYear/Identifier";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const eventRouter = createTRPCRouter({
  getOptions: publicProcedure
    .input(
      z.object({
        schoolYearId: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const { schoolYear } = await di.cradle.schoolYearController.findById({
        id: new SchoolYearId(input.schoolYearId),
      });
      if (schoolYear == null) {
        throw new TRPCError({
          message: "School year not found",
          code: "NOT_FOUND",
        });
      }
      const res = await di.cradle.knoqEventsApi.getEvents(
        schoolYear.startDate.toISOString(),
        schoolYear.endDate.toISOString(),
      );
      return res.data;
    }),
});
