import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class ListAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User[] {
    const adminUser = this.usersRepository.findById(user_id);

    if (!adminUser) {
      throw new Error("User not found");
    }
    if(adminUser.admin !== true) {
      throw new Error("User do not permit admin access");
    }
    return this.usersRepository.list();
  }
}

export { ListAllUsersUseCase };
