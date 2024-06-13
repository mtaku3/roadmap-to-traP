import { di } from "@/modules/di";
import { SchoolYearId } from "@/modules/domain/SchoolYear/Identifier";
import { WorkshopId } from "@/modules/domain/Workshop/Identifier";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
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
  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string(),
        courses: z.array(
          z.object({
            name: z.string(),
            description: z.string(),
            memo: z.string(),
            order: z.number().int(),
            events: z.array(z.string()),
          }),
        ),
        workshopsDependentOn: z.array(z.string()),
        schoolYearId: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const user = ctx.user;
      const { workshop } = await di.cradle.workshopController.create({
        ...input,
        userId: user.id.toString(),
      });
      return workshop;
    }),
  getAll: publicProcedure
    .input(
      z.object({
        schoolYearId: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const { workshops } = await di.cradle.workshopController.getAll({
        schoolYearId: new SchoolYearId(input.schoolYearId),
      });
      return workshops;
    }),
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        description: z.string(),
        courses: z.array(
          z.object({
            id: z.string(),
            name: z.string(),
            description: z.string(),
            memo: z.string(),
            order: z.number().int(),
            events: z.array(z.string()),
          }),
        ),
        workshopsDependentOn: z.array(z.string()),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const user = ctx.user;
      const { workshop } = await di.cradle.workshopController.findById({
        id: new WorkshopId(input.id),
      });
      if (workshop == null) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }
      if (!workshop.userId.equalsTo(user.id)) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
      await di.cradle.workshopController.update({
        ...input,
      });
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const user = ctx.user;
      const { workshop } = await di.cradle.workshopController.findById({
        id: new WorkshopId(input.id),
      });
      if (workshop == null) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }
      if (!workshop.userId.equalsTo(user.id)) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
      await di.cradle.workshopController.delete({
        id: new WorkshopId(input.id),
      });
    }),
});
