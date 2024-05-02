import { TraqId, User } from "./Entity";

export interface IUserRepository {
  findByTraqId(traqId: TraqId): Promise<User | null>;
  create(user: User): Promise<void>;
  update(user: User): Promise<void>;
}
