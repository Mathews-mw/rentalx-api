import { inject, injectable } from "tsyringe";
import { hash } from 'bcryptjs'
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { UsersRepository } from "../../repositories/implementations/UsersRepository";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { AppError } from "../../../../errors/AppError";

@injectable()
class CreateUserUseCase {

  constructor(
    @inject(UsersRepository)
    private UserRepository: IUsersRepository
  ) {};

  async execute(data: ICreateUserDTO): Promise<void> {
    const { name, password, email, driver_license } = data;

    const userAlreadyExists = await this.UserRepository.findByEmail(email);

    if(userAlreadyExists) {
      throw new AppError('User Already exists!')
    };

    const passwordHash = await hash(password, 8);
    
    await this.UserRepository.create({
      name,
      password: passwordHash,
      email,
      driver_license,
    });
  };

}

export { CreateUserUseCase }