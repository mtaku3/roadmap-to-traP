import { User } from "./Entity";
import { UserId } from "./Identifier";

export interface IUserRepository {
  findById(id: UserId): Promise<User | undefined>;
  exist(id: UserId): Promise<boolean>;
  save(user: User): Promise<void>;
  delete(id: UserId): Promise<void>;
}
