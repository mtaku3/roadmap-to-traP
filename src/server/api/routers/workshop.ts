import { di } from "@/modules/di";
import { SchoolYearId } from "@/modules/domain/SchoolYear/Identifier";
import { WorkshopId } from "@/modules/domain/Workshop/Identifier";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { z } from "zod";

export const workshopRouter = createTRPCRouter({
  getLatest: publicProcedure
    .input(
      z.object({
        schoolYearId: z.string(),
        limit: z.number().min(1).max(10).optional(),
        cursor: z.string().optional(),
      }),
    )
    .query(async ({ input }) => {
      const limit = input.limit ?? 10;
      const { cursor } = input;
      const res = await di.cradle.workshopController.getLatest({
        schoolYearId: new SchoolYearId(input.schoolYearId),
        limit,
        cursor,
      });
      return res;
    }),
  findById: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const res = await di.cradle.workshopController.findById({
        id: new WorkshopId(input.id),
      });
      return res.workshop;
    }),
});
