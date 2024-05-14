import { PrismaClient } from "@prisma/client";
import { ISchoolYearRepository } from "@/modules/domain/SchoolYear/IRepository";
import { SchoolYear } from "@/modules/domain/SchoolYear/Entity";
import { SchoolYearId } from "@/modules/domain/SchoolYear/Identifier";

export class SchoolYearRepository implements ISchoolYearRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findById(id: SchoolYearId): Promise<SchoolYear | undefined> {
    const res = await this.prisma.schoolYear.findUnique({
      where: {
        id: id.toString(),
      },
    });
    if (res == null) {
      return undefined;
    }
    return new SchoolYear(
      {
        name: res.name,
        value: res.value,
      },
      new SchoolYearId(res.id),
    );
  }

  async exist(id: SchoolYearId): Promise<boolean> {
    const res = await this.prisma.schoolYear.count({
      where: {
        id: id.toString(),
      },
    });
    return res != 0;
  }

  async save(schoolYear: SchoolYear): Promise<void> {
    await this.prisma.schoolYear.upsert({
      create: {
        id: schoolYear.id.toString(),
        name: schoolYear.name,
        value: schoolYear.value,
      },
      update: {
        name: schoolYear.name,
        value: schoolYear.value,
      },
      where: {
        id: schoolYear.id.toString(),
      },
    });
  }

  async delete(id: SchoolYearId): Promise<void> {
    await this.prisma.schoolYear.delete({
      where: {
        id: id.toString(),
      },
    });
  }

  async getAll(): Promise<SchoolYear[]> {
    const schoolYears = await this.prisma.schoolYear.findMany();
    return schoolYears.map(
      (schoolYear) =>
        new SchoolYear(
          { name: schoolYear.name, value: schoolYear.value },
          new SchoolYearId(schoolYear.id),
        ),
    );
  }
}
