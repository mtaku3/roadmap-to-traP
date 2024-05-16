import { Entity } from "@/modules/core/Entity";
import { EventId } from "./Identifier";
import { EventAttendance } from "../EventAttendance/Entity";
import { UserId } from "../User/Identifier";

export interface EventProps {
  name: string;
  description: string;
  timeStart: Date;
  timeEnd: Date;
  place: string;
  attendees: EventAttendance[];
}

export class Event extends Entity<EventProps, EventId> {
  static create(
    id: EventId,
    name: string,
    description: string,
    timeStart: Date,
    timeEnd: Date,
    place: string,
    attendees: EventAttendance[],
  ) {
    return new Event(
      {
        name,
        description,
        timeStart,
        timeEnd,
        place,
        attendees,
      },
      id,
    );
  }

  get name(): string {
    return this._props.name;
  }

  get description(): string {
    return this._props.description;
  }

  get timeStart(): Date {
    return this._props.timeStart;
  }

  get timeEnd(): Date {
    return this._props.timeEnd;
  }

  get place(): string {
    return this._props.place;
  }

  get attendees(): EventAttendance[] {
    return this._props.attendees != null
      ? [...this._props.attendees]
      : this._props.attendees;
  }

  getAttendanceByUserId(userId: UserId): EventAttendance | undefined {
    return this.attendees.find((attendance) =>
      attendance.userId.equalsTo(userId),
    );
  }
}
