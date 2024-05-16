import { AggregateRoot } from "@/modules/core/AggregateRoot";
import { WorkshopId } from "./Identifier";
import { Course } from "../Course/Entity";
import { SchoolYearId } from "../SchoolYear/Identifier";
import { UserId } from "../User/Identifier";

export interface WorkshopProps {
  name: string;
  description: string;
  courses: Course[];
  workshopsDependentOn: WorkshopId[];
  schoolYearId: SchoolYearId;
  userId: UserId;
}

export class Workshop extends AggregateRoot<WorkshopProps, WorkshopId> {
  static create(
    name: string,
    description: string,
    courses: Course[],
    workshopsDependentOn: WorkshopId[],
    schoolYearId: SchoolYearId,
    userId: UserId,
  ) {
    return new Workshop(
      {
        name,
        description,
        courses,
        workshopsDependentOn,
        schoolYearId,
        userId,
      },
      WorkshopId.next(),
    );
  }

  get name(): string {
    return this._props.name;
  }

  get description(): string {
    return this._props.description;
  }

  get courses(): Course[] {
    return this._props.courses != null
      ? [...this._props.courses]
      : this._props.courses;
  }

  get workshopsDependentOn(): WorkshopId[] {
    return this._props.workshopsDependentOn != null
      ? [...this._props.workshopsDependentOn]
      : this._props.workshopsDependentOn;
  }

  get schoolYearId(): SchoolYearId {
    return this._props.schoolYearId;
  }

  get UserId(): UserId {
    return this._props.userId;
  }

  setName(name: string) {
    this._props.name = name;
  }

  setDescription(description: string) {
    this._props.description = description;
  }

  setSchoolYear(schoolYear: SchoolYearId) {
    this._props.schoolYearId = schoolYear;
  }

  addCourse(course: Course) {
    if (
      this._props.courses.find((x) =>
        x instanceof Course ? x.id.equalsTo(course.id) : x === course,
      ) == null
    ) {
      this._props.courses.push(course);
    }
  }

  removeCourse(course: Course) {
    this._props.courses = this._props.courses.filter((x) =>
      x instanceof Course ? x.id.equalsTo(course.id) : x !== course,
    );
  }

  addWorkshopsDependentOn(workshopsDependentOn: WorkshopId) {
    if (
      this._props.workshopsDependentOn.find((x) =>
        x.equalsTo(workshopsDependentOn),
      ) == null
    ) {
      this._props.workshopsDependentOn.push(workshopsDependentOn);
    }
  }

  removeWorkshopsDependentOn(workshopsDependentOn: WorkshopId) {
    this._props.workshopsDependentOn = this._props.workshopsDependentOn.filter(
      (x) => x.equalsTo(workshopsDependentOn),
    );
  }
}
