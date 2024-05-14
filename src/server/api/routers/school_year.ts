import { di } from "@/modules/di";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const schoolYearRouter = createTRPCRouter({
  get: publicProcedure.query(async () => {
    const { schoolYears } = await di.cradle.schoolYearController.getAll({});
    return schoolYears;
  }),
});
