import { SchoolYear } from "@/modules/domain/SchoolYear/Entity";
import { ISchoolYearRepository } from "@/modules/domain/SchoolYear/IRepository";
import { SchoolYearId } from "@/modules/domain/SchoolYear/Identifier";

export class SchoolYearController {
  constructor(private readonly schoolYearRepository: ISchoolYearRepository) {}

  async findById(req: FindByIdRequestDTO): Promise<FindByIdResponseDTO> {
    const schoolYear = await this.schoolYearRepository.findById(req.id);
    return { schoolYear };
  }

  async getAll(req: GetAllRequestDTO): Promise<GetAllResponseDTO> {
    const schoolYears = await this.schoolYearRepository.getAll();
    return { schoolYears };
  }

  /* __PLOP_FUNCTION_APPEND__ */
}

export interface FindByIdRequestDTO {
  id: SchoolYearId;
}

export interface FindByIdResponseDTO {
  schoolYear?: SchoolYear;
}

export interface GetAllRequestDTO {}

export interface GetAllResponseDTO {
  schoolYears: SchoolYear[];
}

/* __PLOP_DTO_APPEND__ */
