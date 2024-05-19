import { di } from "@/modules/di";
import { SchoolYear } from "@/modules/domain/SchoolYear/Entity";
import { SchoolYearId } from "@/modules/domain/SchoolYear/Identifier";

async function main() {
  const schoolYear = new SchoolYear(
    { name: "2024", value: 2024 },
    new SchoolYearId("740d929a-64f0-4145-9f0f-0d00cb0aa018"),
  );
  await di.cradle.schoolYearRepository.save(schoolYear);

  await di.cradle.prisma.appConfig.upsert({
    create: {
      id: "b289114e-415b-4cf1-b6e7-94203cbbc952",
      schoolYearId: schoolYear.id.toString(),
    },
    update: {
      schoolYearId: schoolYear.id.toString(),
    },
    where: {
      id: "b289114e-415b-4cf1-b6e7-94203cbbc952",
    },
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
