import { SchoolYearId } from "../SchoolYear/Identifier";
import { Workshop } from "./Entity";
import { WorkshopId } from "./Identifier";

export interface IWorkshopRepository {
  findById(id: WorkshopId): Promise<Workshop | undefined>;
  exist(id: WorkshopId): Promise<boolean>;
  save(workshop: Workshop): Promise<void>;
  delete(id: WorkshopId): Promise<void>;

  getLatest(
    schoolYearId: SchoolYearId,
    limit?: number,
    cursor?: string,
  ): Promise<{ workshops: Workshop[]; nextCursor?: string }>;
  getAll(schoolYearId: SchoolYearId): Promise<Workshop[]>;
}
