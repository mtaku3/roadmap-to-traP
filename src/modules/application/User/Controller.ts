import { User } from "@/modules/domain/User/Entity";
import { IUserRepository } from "@/modules/domain/User/IRepository";
import { UserId } from "@/modules/domain/User/Identifier";

export class UserController {
  constructor(private readonly userRepository: IUserRepository) {}

  async createUser(req: CreateUserRequestDTO): Promise<CreateUserResponseDTO> {
    await this.userRepository.create(req.user);
    return {};
  }

  async findById(req: FindByIdRequestDTO): Promise<FindByIdResponseDTO> {
    const user = await this.userRepository.findById(req.id);
    return { user };
  }

  /* __PLOP_FUNCTION_APPEND__ */
}

export interface CreateUserRequestDTO {
  user: User;
}

export interface CreateUserResponseDTO {}

export interface FindByIdRequestDTO {
  id: UserId;
}

export interface FindByIdResponseDTO {
  user?: User;
}

/* __PLOP_DTO_APPEND__ */
