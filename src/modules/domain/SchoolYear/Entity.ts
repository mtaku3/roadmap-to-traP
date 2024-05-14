import { AggregateRoot } from "@/modules/core/AggregateRoot";
import { SchoolYearId } from "./Identifier";

export interface SchoolYearProps {
  name: string;
  value: number;
}

export class SchoolYear extends AggregateRoot<SchoolYearProps, SchoolYearId> {
  static create(name: string, value: number) {
    return new SchoolYear(
      {
        name,
        value,
      },
      SchoolYearId.next(),
    );
  }

  get name(): string {
    return this._props.name;
  }

  get value(): number {
    return this._props.value;
  }

  setName(name: string) {
    this._props.name = name;
  }

  setValue(value: number) {
    this._props.value = value;
  }
}
