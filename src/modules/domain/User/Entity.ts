import { AggregateRoot } from "@/modules/core/AggregateRoot";
import { UserId } from "./Identifier";

export interface UserProps {
  name: string;
  displayName: string;
  iconFileId: string;
}

export class User extends AggregateRoot<UserProps, UserId> {
  static create(
    id: UserId,
    name: string,
    displayName: string,
    iconFileId: string,
  ) {
    return new User(
      {
        name,
        displayName,
        iconFileId,
      },
      id,
    );
  }

  get name(): string {
    return this._props.name;
  }

  get displayName(): string {
    return this._props.displayName;
  }

  get iconFileId(): string {
    return this._props.iconFileId;
  }
}
