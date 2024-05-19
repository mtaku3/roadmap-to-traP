import { Course } from "@/modules/domain/Course/Entity";
import { CourseId } from "@/modules/domain/Course/Identifier";
import { Event } from "@/modules/domain/Event/Entity";
import { EventId } from "@/modules/domain/Event/Identifier";
import { EventAttendance } from "@/modules/domain/EventAttendance/Entity";
import { EventAttendanceId } from "@/modules/domain/EventAttendance/Identifier";
import { SchoolYear } from "@/modules/domain/SchoolYear/Entity";
import { SchoolYearId } from "@/modules/domain/SchoolYear/Identifier";
import { User } from "@/modules/domain/User/Entity";
import { UserId } from "@/modules/domain/User/Identifier";
import { Workshop } from "@/modules/domain/Workshop/Entity";
import { WorkshopId } from "@/modules/domain/Workshop/Identifier";
import SuperJSON from "superjson";

const entities = [
  { name: "Course", Entity: Course, Identifier: CourseId },
  { name: "Event", Entity: Event, Identifier: EventId },
  {
    name: "EventAttendance",
    Entity: EventAttendance,
    Identifier: EventAttendanceId,
  },
  { name: "SchoolYear", Entity: SchoolYear, Identifier: SchoolYearId },
  { name: "User", Entity: User, Identifier: UserId },
  { name: "Workshop", Entity: Workshop, Identifier: WorkshopId },
];

for (const { name, Entity, Identifier } of entities) {
  SuperJSON.registerCustom<InstanceType<typeof Entity>, string>(
    {
      isApplicable: (v): v is InstanceType<typeof Entity> =>
        v instanceof Entity,
      serialize: (v) =>
        SuperJSON.stringify({
          id: v.id,
          props: v._props,
        }),
      deserialize: (_v) => {
        const v = SuperJSON.parse<{
          id: typeof Identifier;
          props: (typeof Entity)["prototype"]["_props"];
        }>(_v);
        return new Entity(v.props as any, v.id as any);
      },
    },
    `${name}Entity`,
  );

  SuperJSON.registerCustom<InstanceType<typeof Identifier>, string>(
    {
      isApplicable: (v): v is InstanceType<typeof Identifier> =>
        v instanceof Identifier,
      serialize: (v) => v._value,
      deserialize: (v) => new Identifier(v),
    },
    `${name}Identifier`,
  );
}

export default SuperJSON;
