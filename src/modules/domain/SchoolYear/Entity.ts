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

  get startDate(): Date {
    return new Date(this.value, 3, 1, 0, 0, 0, 0);
  }

  get endDate(): Date {
    return new Date(
      new Date(this.value + 1, 3, 1, 23, 59, 59, 999).getTime() -
        24 * 60 * 60 * 1000,
    );
  }

  setName(name: string) {
    this._props.name = name;
  }

  setValue(value: number) {
    this._props.value = value;
  }
}
