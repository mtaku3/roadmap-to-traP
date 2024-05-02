import { Session, SessionId } from "@/service/domain/Session/Entity";
import { UserId, User, TraqId } from "@/service/domain/User/Entity";
import { IUserRepository } from "@/service/domain/User/IRepository";
import { PrismaClient } from "@prisma/client";

export class UserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findByTraqId(traqId: TraqId): Promise<User | null> {
    const _user = await this.prisma.user.findUnique({
      where: {
        traqId: traqId.value,
      },
      include: {
        session: true,
      },
    });
    return (
      _user &&
      new User(
        new UserId(_user.id),
        new TraqId(_user.traqId),
        _user.name,
        _user.displayName,
        _user.iconFileId,
        new Session(
          new SessionId(_user.session.id),
          _user.session.refreshToken,
          _user.session.expiresAt,
        ),
      )
    );
  }

  async create(user: User): Promise<void> {
    this.prisma.user.create({
      data: {
        id: user.id.value,
        traqId: user.traqId.value,
        name: user.name,
        displayName: user.displayName,
        iconFileId: user.iconFileId,
        session: {
          create: {
            id: user.session.id.value,
            refreshToken: user.session.refreshToken,
            expiresAt: user.session.expiresAt,
          },
        },
      },
    });
  }

  async update(user: User): Promise<void> {
    await this.prisma.user.update({
      where: {
        id: user.id.value,
      },
      data: {
        traqId: user.traqId.value,
        name: user.name,
        displayName: user.displayName,
        iconFileId: user.iconFileId,
        session: {
          update: {
            where: {
              id: user.session.id.value,
            },
            data: {
              refreshToken: user.session.refreshToken,
              expiresAt: user.session.expiresAt,
            },
          },
        },
      },
    });
  }
}
