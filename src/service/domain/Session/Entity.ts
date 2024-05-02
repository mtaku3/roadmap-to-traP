import { Entity, EntityId } from "@/service/domain/common";

export class SessionId extends EntityId {}

export class Session extends Entity {
  constructor(
    public id: SessionId,
    public refreshToken: string,
    public expiresAt: Date,
  ) {
    super();
  }
}
