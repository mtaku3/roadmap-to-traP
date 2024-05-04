import { Entity } from "./Entity";
import { Identifier } from "./Identifier";

export abstract class AggregateRoot<
  T extends Object,
  U extends Identifier,
> extends Entity<T, U> {}
