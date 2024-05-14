import { SchoolYear } from "./Entity";
import { SchoolYearId } from "./Identifier";

export interface ISchoolYearRepository {
  findById(id: SchoolYearId): Promise<SchoolYear | undefined>;
  exist(id: SchoolYearId): Promise<boolean>;
  save(schoolYear: SchoolYear): Promise<void>;
  delete(id: SchoolYearId): Promise<void>;

  getAll(): Promise<SchoolYear[]>;
}
