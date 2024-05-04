import { v4 as uuidv4 } from "uuid";
import { IValueObject } from "./IValueObject";

export abstract class Identifier implements IValueObject {
  constructor(public readonly _value: string) {}

  static next<T extends Identifier>(this: new (_value: string) => T): T {
    return new this(uuidv4());
  }

  equalsTo(another: this): boolean {
    return this._value === another._value;
  }

  toString(): string {
    return this._value;
  }
}
