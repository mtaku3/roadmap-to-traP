import { Identifier } from "./Identifier";

export abstract class Entity<T extends Object, U extends Identifier> {
  protected readonly _id: U;
  public _props: T;

  public constructor(props: T, id: U) {
    this._id = id;
    this._props = Object.assign({}, props);
  }

  public get id(): U {
    return this._id;
  }
}
