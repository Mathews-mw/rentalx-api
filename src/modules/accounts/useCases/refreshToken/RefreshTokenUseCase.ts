import { inject, injectable } from 'tsyringe';

import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { UsersTokensRepository } from '@modules/accounts/infra/typeorm/repositories/UsersTokensRepository';
import { verify, sign } from 'jsonwebtoken';
import auth from '@config/auth';
import { AppError } from '@shared/errors/AppError';
import { IDateProvider } from '@shared/providers/DateProvider/IDateProvider';
import { DayjsDateProvider } from '@shared/providers/DateProvider/implementations/DayjsDateProvider';

interface IPayload {
	sub: string;
	email: string;
}

@injectable()
class RefreshTokenUseCase {
	constructor(
		@inject(UsersTokensRepository)
		private usersTokensRepository: IUsersTokensRepository,
		@inject(DayjsDateProvider)
		private dateProvider: IDateProvider
	) {}

	async execute(token: string): Promise<string> {
		const { sub, email } = verify(token, auth.secret_refresh_token) as IPayload;
		const { secret_refresh_token, expires_in_refresh_token, expires_in_refresh_token_days } = auth;

		const user_id = sub;

		const userToken = await this.usersTokensRepository.findByUserIdAndRefreshToken(user_id, token);

		if (!userToken) {
			throw new AppError('Refresh token does not exists!');
		}

		await this.usersTokensRepository.deleteById(userToken.id);

		const refresh_token = sign({ email }, secret_refresh_token, {
			subject: sub,
			expiresIn: expires_in_refresh_token,
		});

		const refresh_token_expires_date = this.dateProvider.addDays(expires_in_refresh_token_days);

		await this.usersTokensRepository.create({
			user_id: sub,
			refresh_token,
			expires_date: refresh_token_expires_date,
		});

		return refresh_token;
	}
}

export { RefreshTokenUseCase };
