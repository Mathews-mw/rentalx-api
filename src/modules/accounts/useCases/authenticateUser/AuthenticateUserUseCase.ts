import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import auth from '@config/auth';
import { AppError } from '@shared/errors/AppError';
import { IDateProvider } from '@shared/providers/DateProvider/IDateProvider';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository';
import { DayjsDateProvider } from '@shared/providers/DateProvider/implementations/DayjsDateProvider';
import { UsersTokensRepository } from '@modules/accounts/infra/typeorm/repositories/UsersTokensRepository';

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
	refresh_token: string;
}

@injectable()
class AuthenticateUserUseCase {
	constructor(
		@inject(UsersRepository)
		private UserRepository: IUsersRepository,
		@inject(UsersTokensRepository)
		private usersTokensRepository: IUsersTokensRepository,
		@inject(DayjsDateProvider)
		private dateProvider: IDateProvider
	) {}

	async execute({ email, password }: IRequest): Promise<IResponse> {
		const user = await this.UserRepository.findByEmail(email);
		const { secret_token, secret_refresh_token, expires_in_token, expires_in_refresh_token, expires_in_refresh_token_days } = auth;

		if (!user) {
			throw new AppError('Email or password incorrect!');
		}

		const passwordMatch = await compare(password, user.password);

		if (!passwordMatch) {
			throw new AppError('Email or password incorrect!');
		}

		const token = sign({}, secret_token, {
			subject: user.id,
			expiresIn: expires_in_token,
		});

		const refresh_token = sign({ email }, secret_refresh_token, {
			subject: user.id,
			expiresIn: expires_in_refresh_token,
		});

		const refresh_token_expires_date = this.dateProvider.addDays(expires_in_refresh_token_days);

		await this.usersTokensRepository.create({
			user_id: user.id,
			refresh_token,
			expires_date: refresh_token_expires_date,
		});

		const returnToken: IResponse = {
			token: token,
			user: {
				name: user.name,
				password: user.password,
			},
			refresh_token,
		};

		return returnToken;
	}
}

export { AuthenticateUserUseCase };
