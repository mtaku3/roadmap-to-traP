import { PrismaClient } from "@prisma/client";
import { IUserRepository } from "@/modules/domain/User/IRepository";
import { User } from "@/modules/domain/User/Entity";
import { UserId } from "@/modules/domain/User/Identifier";

export class UserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findById(id: UserId): Promise<User | undefined> {
    const res = await this.prisma.user.findUnique({
      where: {
        id: id.toString(),
      },
    });
    if (res == null) {
      return undefined;
    }
    return new User(
      {
        name: res.name,
        displayName: res.displayName,
        iconFileId: res.iconFileId,
      },
      new UserId(res.id),
    );
  }

  async exist(id: UserId): Promise<boolean> {
    const res = await this.prisma.user.count({
      where: {
        id: id.toString(),
      },
    });
    return res != 0;
  }

  async create(user: User): Promise<void> {
    await this.prisma.user.create({
      data: {
        id: user.id.toString(),
        name: user.name,
        displayName: user.displayName,
        iconFileId: user.iconFileId,
      },
    });
  }

  async update(user: User): Promise<void> {
    await this.prisma.user.update({
      data: {
        name: user.name,
        displayName: user.displayName,
        iconFileId: user.iconFileId,
      },
      where: {
        id: user.id.toString(),
      },
    });
  }

  async delete(id: UserId): Promise<void> {
    await this.prisma.user.delete({
      where: {
        id: id.toString(),
      },
    });
  }
}
