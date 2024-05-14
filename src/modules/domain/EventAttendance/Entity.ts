import { Entity } from "@/modules/core/Entity";
import { EventAttendanceId } from "./Identifier";
import { UserId } from "../User/Identifier";

export interface EventAttendanceProps {
  userId: UserId;
  schedule: "pending" | "attendance" | "absent";
}

export class EventAttendance extends Entity<
  EventAttendanceProps,
  EventAttendanceId
> {
  static create(userId: UserId, schedule: "pending" | "attendance" | "absent") {
    return new EventAttendance(
      {
        userId,
        schedule,
      },
      EventAttendanceId.next(),
    );
  }

  get userId(): UserId {
    return this._props.userId;
  }

  get schedule(): "pending" | "attendance" | "absent" {
    return this._props.schedule;
  }

  setUserId(userId: UserId) {
    this._props.userId = userId;
  }

  setSchedule(schedule: "pending" | "attendance" | "absent") {
    this._props.schedule = schedule;
  }
}
