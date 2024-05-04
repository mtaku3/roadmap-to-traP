import { IUserRepository } from "@/modules/domain/User/IRepository";
import { User } from "@/modules/domain/User/Entity";
import { UserId } from "@/modules/domain/User/Identifier";
import { type UserApiFactory } from "@/modules/external/traq/api/user-api";
import { AxiosError } from "axios";

export class UserRepository implements IUserRepository {
  constructor(
    private readonly traqUserApi: ReturnType<typeof UserApiFactory>,
  ) {}

  async findById(id: UserId): Promise<User | undefined> {
    let res;
    try {
      res = await this.traqUserApi.getUser(id.toString());
    } catch (e) {
      if (e instanceof AxiosError && e.response?.status === 404) {
        return undefined;
      } else {
        throw e;
      }
    }

    return new User(
      {
        name: res.data.name,
        displayName: res.data.displayName,
        iconFileId: res.data.iconFileId,
      },
      new UserId(res.data.id),
    );
  }

  async exist(id: UserId): Promise<boolean> {
    try {
      await this.traqUserApi.getUser(id.toString());
    } catch (e) {
      if (e instanceof AxiosError && e.response?.status === 404) {
        return false;
      } else {
        throw e;
      }
    }
    return true;
  }

  async save(user: User): Promise<void> {
    return Promise.reject();
  }

  async delete(id: UserId): Promise<void> {
    return Promise.reject();
  }
}
