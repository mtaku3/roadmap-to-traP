import { Prisma, PrismaClient } from "@prisma/client";
import { IWorkshopRepository } from "@/modules/domain/Workshop/IRepository";
import { Workshop } from "@/modules/domain/Workshop/Entity";
import { WorkshopId } from "@/modules/domain/Workshop/Identifier";
import { Course } from "@/modules/domain/Course/Entity";
import { CourseId } from "@/modules/domain/Course/Identifier";
import { EventsApiFactory } from "@/modules/external/knoq";
import { Event } from "@/modules/domain/Event/Entity";
import { EventId } from "@/modules/domain/Event/Identifier";
import { SchoolYearId } from "@/modules/domain/SchoolYear/Identifier";
import { EventAttendance } from "@/modules/domain/EventAttendance/Entity";
import { UserId } from "@/modules/domain/User/Identifier";

export class WorkshopRepository implements IWorkshopRepository {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly knoqEventsApi: ReturnType<typeof EventsApiFactory>,
  ) {}

  async findById(id: WorkshopId): Promise<Workshop | undefined> {
    const res = await this.prisma.workshop.findUnique({
      include: {
        courses: {
          include: {
            events: true,
          },
        },
        workshopsDependentOn: true,
      },
      where: {
        id: id.toString(),
      },
    });
    if (res == null) {
      return undefined;
    }

    return await this.buildWorkshop(res);
  }

  async exist(id: WorkshopId): Promise<boolean> {
    const res = await this.prisma.workshop.count({
      where: {
        id: id.toString(),
      },
    });
    return res != 0;
  }

  async save(workshop: Workshop): Promise<void> {
    const ops = [];

    for (const course of workshop.courses) {
      for (const event of course.events) {
        ops.push(
          this.prisma.event.upsert({
            create: {
              id: event.id.toString(),
              courseId: course.id.toString(),
            },
            update: {
              courseId: course.id.toString(),
            },
            where: {
              id: event.id.toString(),
            },
          }),
        );
      }

      ops.push(
        this.prisma.course.upsert({
          create: {
            id: course.id.toString(),
            name: course.name,
            description: course.description,
            order: course.order,
            workshopId: workshop.id.toString(),
          },
          update: {
            name: course.name,
            description: course.description,
            order: course.order,
            workshopId: workshop.id.toString(),
          },
          where: {
            id: course.id.toString(),
          },
        }),
      );
    }

    ops.push(
      this.prisma.workshop.upsert({
        create: {
          id: workshop.id.toString(),
          name: workshop.name,
          description: workshop.description,
          schoolYearId: workshop.schoolYearId.toString(),
        },
        update: {
          name: workshop.name,
          description: workshop.description,
          schoolYearId: workshop.schoolYearId.toString(),
          courses: {
            deleteMany: {
              AND: workshop.courses.map((course) => {
                return {
                  NOT: {
                    id: course.id.toString(),
                  },
                };
              }),
            },
          },
        },
        where: {
          id: workshop.id.toString(),
        },
      }),
    );

    await this.prisma.$transaction(ops);
  }

  async delete(id: WorkshopId): Promise<void> {
    await this.prisma.workshop.delete({
      where: {
        id: id.toString(),
      },
    });
  }

  async getLatest(
    schoolYearId: SchoolYearId,
    limit?: number,
    cursor?: string,
  ): Promise<{ workshops: Workshop[]; nextCursor?: string }> {
    limit = limit ?? 50;
    const items = await this.prisma.workshop.findMany({
      include: {
        courses: {
          include: {
            events: true,
          },
        },
        workshopsDependentOn: true,
      },
      where: {
        schoolYearId: schoolYearId.toString(),
      },
      take: limit + 1,
      cursor: cursor ? { id: cursor } : undefined,
      orderBy: {
        name: "asc",
      },
    });
    let nextCursor: typeof cursor | undefined = undefined;
    if (items.length > limit) {
      const nextItem = items.pop();
      nextCursor = nextItem!.id;
    }

    return {
      workshops: await Promise.all(items.map((x) => this.buildWorkshop(x))),
      nextCursor,
    };
  }

  private async buildWorkshop(
    x: Prisma.WorkshopGetPayload<{
      include: {
        courses: {
          include: {
            events: true;
          };
        };
        workshopsDependentOn: true;
      };
    }>,
  ): Promise<Workshop> {
    const courses: Course[] = [];
    for (const course of x.courses) {
      const events: Event[] = [];
      for (const event of course.events) {
        const x = await this.knoqEventsApi.getEventDetail(event.id);
        events.push(
          new Event(
            {
              name: x.data.name,
              description: x.data.description,
              timeStart: new Date(x.data.timeStart),
              timeEnd: new Date(x.data.timeEnd),
              place: x.data.place,
              attendees: x.data.attendees.map((x) =>
                EventAttendance.create(new UserId(x.userId), x.schedule),
              ),
            },
            new EventId(event.id),
          ),
        );
      }

      courses.push(
        new Course(
          {
            name: course.name,
            description: course.description,
            order: course.order,
            events,
          },
          new CourseId(course.id),
        ),
      );
    }

    return new Workshop(
      {
        name: x.name,
        description: x.description,
        schoolYearId: new SchoolYearId(x.schoolYearId),
        courses,
        workshopsDependentOn: x.workshopsDependentOn.map(
          (x) => new WorkshopId(x.id),
        ),
      },
      new WorkshopId(x.id),
    );
  }
}
