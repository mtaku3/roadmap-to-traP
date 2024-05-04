import { User } from "@/modules/domain/User/Entity";
import { IUserRepository } from "@/modules/domain/User/IRepository";
import { UserId } from "@/modules/domain/User/Identifier";

export class UserController {
  constructor(private readonly userRepository: IUserRepository) {}

  /* __PLOP_FUNCTION_APPEND__ */
  async findById(
    req: FindUserByIdRequestDTO,
  ): Promise<FindUserByIdResponseDTO> {
    const user = await this.userRepository.findById(req.id);
    return { user };
  }

  async createOrUpdate(
    req: CreateOrUpdateUserRequestDTO,
  ): Promise<CreateOrUpdateUserResponseDTO> {
    let user = await this.userRepository.findById(req.id);
    if (user != null) {
      user.setName(req.name);
      user.setDisplayName(req.displayName);
      user.setIconFileId(req.iconFileId);
    } else {
      user = User.create(req.id, req.name, req.displayName, req.iconFileId);
    }
    await this.userRepository.save(user);
    return { user };
  }
}

export interface CreateOrUpdateUserRequestDTO {
  id: UserId;
  name: string;
  displayName: string;
  iconFileId: string;
}

export interface CreateOrUpdateUserResponseDTO {
  user: User;
}

export interface FindUserByIdRequestDTO {
  id: UserId;
}

export interface FindUserByIdResponseDTO {
  user: User | undefined;
}
