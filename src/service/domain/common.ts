import { v4 as uuidv4 } from "uuid";

export abstract class Entity {}

export interface IValueObject {
  equalsTo(another: this): boolean;
}

export class EntityId implements IValueObject {
  constructor(public readonly value: string) {}

  static next<T extends EntityId>(this: new (value: string) => T): T {
    return new this(uuidv4());
  }

  equalsTo(another: this): boolean {
    return this.value === another.value;
  }
}
