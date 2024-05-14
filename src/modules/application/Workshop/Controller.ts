import { SchoolYearId } from "@/modules/domain/SchoolYear/Identifier";
import { Workshop } from "@/modules/domain/Workshop/Entity";
import { IWorkshopRepository } from "@/modules/domain/Workshop/IRepository";
import { WorkshopId } from "@/modules/domain/Workshop/Identifier";

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

/* __PLOP_DTO_APPEND__ */
