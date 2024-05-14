import { Identifier } from "./Identifier";

export abstract class Entity<T extends Object, U extends Identifier> {
  protected readonly _id: U;
  _props: T;

  constructor(props: T, id: U) {
    this._id = id;
    this._props = Object.assign({}, props);
  }

  get id(): U {
    return this._id;
  }

  toJSON() {
    return {
      id: this._id,
      ...this._props,
    };
  }
}
