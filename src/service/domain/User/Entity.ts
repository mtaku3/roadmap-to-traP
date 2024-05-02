import { Session, SessionId } from "../Session/Entity";
import { Entity, EntityId } from "../common";

export class UserId extends EntityId {}

export class TraqId extends EntityId {}

export class User extends Entity {
  constructor(
    private _id: UserId,
    private _traqId: TraqId,
    private _name: string,
    private _displayName: string,
    private _iconFileId: string,
    private _session: Session,
  ) {
    super();
  }

  static create(
    traqId: TraqId,
    name: string,
    displayName: string,
    iconFileId: string,
    refreshToken: string,
    expiresAt: Date,
  ) {
    return new User(
      UserId.next(),
      traqId,
      name,
      displayName,
      iconFileId,
      new Session(SessionId.next(), refreshToken, expiresAt),
    );
  }

  get id(): UserId {
    return this._id;
  }

  get traqId(): TraqId {
    return this._traqId;
  }

  get name(): string {
    return this._name;
  }

  get displayName(): string {
    return this._displayName;
  }

  get iconFileId(): string {
    return this._iconFileId;
  }

  get session(): Session {
    return this._session;
  }

  updateSession(refreshToken: string, expiresAt: Date) {
    this._session.refreshToken = refreshToken;
    this._session.expiresAt = expiresAt;
  }
}
