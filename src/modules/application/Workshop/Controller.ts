import { Course } from "@/modules/domain/Course/Entity";
import { EventId } from "@/modules/domain/Event/Identifier";
import { SchoolYearId } from "@/modules/domain/SchoolYear/Identifier";
import { UserId } from "@/modules/domain/User/Identifier";
import { Workshop } from "@/modules/domain/Workshop/Entity";
import { IWorkshopRepository } from "@/modules/domain/Workshop/IRepository";
import { WorkshopId } from "@/modules/domain/Workshop/Identifier";
import { Event } from "@/modules/domain/Event/Entity";

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

export interface CreateResponseDTO {}

/* __PLOP_DTO_APPEND__ */
