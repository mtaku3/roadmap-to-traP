import { TraqId, User } from "../domain/User/Entity";
import { IUserRepository } from "../domain/User/IRepository";

export class UserController {
  constructor(private readonly userRepository: IUserRepository) {}

  async createUser(req: CreateUserRequest): Promise<CreateUserResponse> {
    const user = User.create(
      req.traqId,
      req.name,
      req.displayName,
      req.iconFileId,
      req.refreshToken,
      req.expiresAt,
    );
    await this.userRepository.create(user);
    return { user };
  }

  async findByTraqId(req: FindByTraqIdRequest): Promise<FindByTraqIdResponse> {
    const user = await this.userRepository.findByTraqId(req.traqId);
    return { user };
  }

  async updateSession(
    req: UpdateSessionRequest,
  ): Promise<UpdateSessionResponse> {
    const user = await this.userRepository.findByTraqId(req.traqId);
    if (user == null) {
      throw new UserNotFoundException();
    }
    user.updateSession(req.refreshToken, req.expiresAt);
    await this.userRepository.update(user);
    return {};
  }
}

export interface CreateUserRequest {
  traqId: TraqId;
  name: string;
  displayName: string;
  iconFileId: string;
  refreshToken: string;
  expiresAt: Date;
}

export interface CreateUserResponse {
  user: User;
}

export interface FindByTraqIdRequest {
  traqId: TraqId;
}

export interface FindByTraqIdResponse {
  user: User | null;
}

export interface UpdateSessionRequest {
  traqId: TraqId;
  refreshToken: string;
  expiresAt: Date;
}

export interface UpdateSessionResponse {}

export class UserControllerException extends Error {}
export class UserNotFoundException extends UserControllerException {}
