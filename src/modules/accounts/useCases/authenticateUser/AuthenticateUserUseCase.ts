import { inject, injectable } from 'tsyringe'
import { UsersRepository } from '../../repositories/implementations/UsersRepository';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { AppError } from '../../../../errors/AppError';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  token: string;
  user: {
    name: string,
    password: string,
  };
}

@injectable()
class AuthenticateUserUseCase {

  constructor(
    @inject(UsersRepository)
    private UserRepository: IUsersRepository
  ) {};

  async execute({email, password}: IRequest): Promise<IResponse> {

    const user = await this.UserRepository.findByEmail(email);

    if(!user) {
      throw new AppError("Email or password incorrect!")
    };

    const passwordMatch = await compare(password, user.password);
    
    if(!passwordMatch) {
      throw new AppError("Email or password incorrect!")
    };

    const token = sign({}, "ecab09c93eb09c2d2eb13449044fd4e3", {
      subject: user.id,
      expiresIn: "1d"
    })

    const returnToken: IResponse = {
      token: token,
      user: {
        name: user.name,
        password: user.password
      }
    }

    return  returnToken;
  };

};

export { AuthenticateUserUseCase };