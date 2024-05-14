import { Entity } from "@/modules/core/Entity";
import { CourseId } from "./Identifier";
import { Event } from "../Event/Entity";

export interface CourseProps {
  name: string;
  description: string;
  order: number;
  events: Event[];
}

export class Course extends Entity<CourseProps, CourseId> {
  static create(
    name: string,
    description: string,
    order: number,
    events: Event[],
  ) {
    return new Course(
      {
        name,
        description,
        order,
        events,
      },
      CourseId.next(),
    );
  }

  get name(): string {
    return this._props.name;
  }

  get description(): string {
    return this._props.description;
  }

  get order(): number {
    return this._props.order;
  }

  get events(): Event[] {
    return this._props.events != null
      ? [...this._props.events]
      : this._props.events;
  }

  setName(name: string) {
    this._props.name = name;
  }

  setDescription(description: string) {
    this._props.description = description;
  }

  setOrder(order: number) {
    this._props.order = order;
  }

  addEvent(event: Event) {
    this._props.events.push(event);
  }

  removeEvent(event: Event) {
    this._props.events = this._props.events.filter((x) =>
      x instanceof Event ? x.id.equalsTo(event.id) : x !== event,
    );
  }
}
