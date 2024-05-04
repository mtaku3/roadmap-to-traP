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
}

export interface FindUserByIdRequestDTO {
  id: UserId;
}

export interface FindUserByIdResponseDTO {
  user: User | undefined;
}
