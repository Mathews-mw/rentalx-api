import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository';
import { UsersTokensRepository } from '@modules/accounts/infra/typeorm/repositories/UsersTokensRepository';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { AppError } from '@shared/errors/AppError';
import { IDateProvider } from '@shared/providers/DateProvider/IDateProvider';
import { DayjsDateProvider } from '@shared/providers/DateProvider/implementations/DayjsDateProvider';
import { inject, injectable } from 'tsyringe';
import { hash } from 'bcryptjs';

interface IRequest {
	token: string;
	password: string;
}

@injectable()
class ResetPasswordUserUseCase {
	constructor(
		@inject(UsersRepository)
		private userRespository: IUsersRepository,
		@inject(UsersTokensRepository)
		private usersTokensRepository: IUsersTokensRepository,
		@inject(DayjsDateProvider)
		private dateProvider: IDateProvider
	) {}

	async execute({ token, password }: IRequest) {
		const userToken = await this.usersTokensRepository.findByRefreshToken(token);

		if (!userToken) {
			throw new AppError('Token invalid!');
		}

		if (this.dateProvider.compareIfBefore(userToken.expires_date, this.dateProvider.dateNow())) {
			throw new AppError('Token expired!');
		}

		const user = await this.userRespository.findById(userToken.user_id);

		user.password = await hash(password, 8);

		await this.userRespository.create(user);

		await this.usersTokensRepository.deleteById(userToken.id);
	}
}

export { ResetPasswordUserUseCase };
