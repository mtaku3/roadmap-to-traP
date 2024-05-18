import { Course } from "@/modules/domain/Course/Entity";
import { EventId } from "@/modules/domain/Event/Identifier";
import { SchoolYearId } from "@/modules/domain/SchoolYear/Identifier";
import { UserId } from "@/modules/domain/User/Identifier";
import { Workshop } from "@/modules/domain/Workshop/Entity";
import { IWorkshopRepository } from "@/modules/domain/Workshop/IRepository";
import { WorkshopId } from "@/modules/domain/Workshop/Identifier";
import { Event } from "@/modules/domain/Event/Entity";
import { WorkshopControllerException } from "./Exception";
import { CourseId } from "@/modules/domain/Course/Identifier";

export class WorkshopController {
  constructor(private readonly workshopRepository: IWorkshopRepository) {}

  async findById(req: FindByIdRequestDTO): Promise<FindByIdResponseDTO> {
    const workshop = await this.workshopRepository.findById(req.id);
    return { workshop };
  }

  async getLatest(req: GetLatestRequestDTO): Promise<GetLatestResponseDTO> {
    const res = await this.workshopRepository.getLatest(
      req.schoolYearId,
      req.limit,
      req.cursor,
    );
    return res;
  }

  async create(req: CreateRequestDTO): Promise<CreateResponseDTO> {
    const courses = [];
    for (const _course of req.courses) {
      const events = [];
      for (const _event of _course.events) {
        // provisonal event creation
        // only EventId is persisted on the database and proper name, descriptions and some sort of props are retrieved from knoQ
        // might be better to put Event to separete aggregate and holds only EventId on Course whatever...
        events.push(
          Event.create(
            new EventId(_event),
            "",
            "",
            new Date(),
            new Date(),
            "",
            [],
          ),
        );
      }
      courses.push(
        Course.create(_course.name, _course.description, _course.order, events),
      );
    }
    const workshop = Workshop.create(
      req.name,
      req.description,
      courses,
      req.workshopsDependentOn.map((x) => new WorkshopId(x)),
      new SchoolYearId(req.schoolYearId),
      new UserId(req.userId),
    );

    await this.workshopRepository.save(workshop);

    return { workshop };
  }

  async getAll(req: GetAllRequestDTO): Promise<GetAllResponseDTO> {
    const items = await this.workshopRepository.getAll(req.schoolYearId);
    return { workshops: items };
  }

  async update(req: UpdateRequestDTO): Promise<UpdateResponseDTO> {
    const workshop = await this.workshopRepository.findById(
      new WorkshopId(req.id),
    );
    if (workshop == null) {
      throw new WorkshopControllerException("Workshop not found");
    }
    workshop.setName(req.name);
    workshop.setDescription(req.description);
    for (const course of workshop.courses) {
      const reqCourse = req.courses.find((x) =>
        course.id.equalsTo(new CourseId(x.id)),
      );
      if (reqCourse != null) {
        course.setName(reqCourse.name);
        course.setDescription(reqCourse.description);
        course.setOrder(reqCourse.order);
        for (const event of course.events) {
          if (
            reqCourse.events.every((x) => !event.id.equalsTo(new EventId(x)))
          ) {
            course.removeEvent(event);
          }
        }
        for (const _reqEventId of reqCourse.events) {
          const reqEventId = new EventId(_reqEventId);
          if (course.events.every((x) => !x.id.equalsTo(reqEventId))) {
            course.addEvent(
              Event.create(reqEventId, "", "", new Date(), new Date(), "", []),
            );
          }
        }
      } else {
        workshop.removeCourse(course);
      }
    }
    for (const reqCourse of req.courses) {
      const course = workshop.courses.find((x) =>
        x.id.equalsTo(new CourseId(reqCourse.id)),
      );
      if (course == null) {
        workshop.addCourse(
          Course.create(
            reqCourse.name,
            reqCourse.description,
            reqCourse.order,
            reqCourse.events.map((reqEventId) =>
              Event.create(
                new EventId(reqEventId),
                "",
                "",
                new Date(),
                new Date(),
                "",
                [],
              ),
            ),
          ),
        );
      }
    }
    for (const workshopDependentOn of workshop.workshopsDependentOn) {
      if (
        req.workshopsDependentOn.every(
          (x) => !workshopDependentOn.equalsTo(new WorkshopId(x)),
        )
      ) {
        workshop.removeWorkshopsDependentOn(workshopDependentOn);
      }
    }
    for (const _reqWorkshopDependentOn of req.workshopsDependentOn) {
      const reqWorkshopDependentOn = new WorkshopId(_reqWorkshopDependentOn);
      if (
        workshop.workshopsDependentOn.every(
          (x) => !x.equalsTo(reqWorkshopDependentOn),
        )
      ) {
        workshop.addWorkshopsDependentOn(reqWorkshopDependentOn);
      }
    }
    await this.workshopRepository.save(workshop);
    return {};
  }

  async delete(req: DeleteRequestDTO): Promise<DeleteResponseDTO> {
    await this.workshopRepository.delete(req.id);
    return {};
  }

  /* __PLOP_FUNCTION_APPEND__ */
}

export interface FindByIdRequestDTO {
  id: WorkshopId;
}

export interface FindByIdResponseDTO {
  workshop: Workshop | undefined;
}

export interface GetLatestRequestDTO {
  schoolYearId: SchoolYearId;
  limit?: number;
  cursor?: string;
}

export interface GetLatestResponseDTO {
  workshops: Workshop[];
  nextCursor?: string;
}

export interface CreateRequestDTO {
  name: string;
  description: string;
  courses: {
    name: string;
    description: string;
    order: number;
    events: string[];
  }[];
  workshopsDependentOn: string[];
  schoolYearId: string;
  userId: string;
}

export interface CreateResponseDTO {
  workshop: Workshop;
}

export interface GetAllRequestDTO {
  schoolYearId: SchoolYearId;
}

export interface GetAllResponseDTO {
  workshops: Workshop[];
}

export interface UpdateRequestDTO {
  id: string;
  name: string;
  description: string;
  courses: {
    id: string;
    name: string;
    description: string;
    order: number;
    events: string[];
  }[];
  workshopsDependentOn: string[];
}

export interface UpdateResponseDTO {}

export interface DeleteRequestDTO {
  id: WorkshopId;
}

export interface DeleteResponseDTO {}

/* __PLOP_DTO_APPEND__ */
