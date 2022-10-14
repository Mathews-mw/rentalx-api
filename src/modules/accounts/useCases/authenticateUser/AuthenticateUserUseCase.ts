import { inject, injectable } from 'tsyringe';
import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { AppError } from '@shared/errors/AppError';
import { sign } from 'jsonwebtoken';
import { compare } from 'bcryptjs';

interface IRequest {
	email: string;
	password: string;
}

interface IResponse {
	token: string;
	user: {
		name: string;
		password: string;
	};
}

@injectable()
class AuthenticateUserUseCase {
	constructor(
		@inject(UsersRepository)
		private UserRepository: IUsersRepository
	) {}

	async execute({ email, password }: IRequest): Promise<IResponse> {
		const user = await this.UserRepository.findByEmail(email);

		if (!user) {
			throw new AppError('Email or password incorrect!');
		}

		const passwordMatch = await compare(password, user.password);

		if (!passwordMatch) {
			throw new AppError('Email or password incorrect!');
		}

		const token = sign({}, 'ecab09c93eb09c2d2eb13449044fd4e3', {
			subject: user.id,
			expiresIn: '1d',
		});

		const returnToken: IResponse = {
			token: token,
			user: {
				name: user.name,
				password: user.password,
			},
		};

		return returnToken;
	}
}

export { AuthenticateUserUseCase };
