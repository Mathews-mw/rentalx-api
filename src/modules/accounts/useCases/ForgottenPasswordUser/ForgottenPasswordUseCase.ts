import { resolve } from 'path';
import { v4 as uuidV4 } from 'uuid';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';
import { IDateProvider } from '@shared/providers/DateProvider/IDateProvider';
import { IMailProvider } from '@shared/providers/MailProvider/IMailProvider';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository';
import { DayjsDateProvider } from '@shared/providers/DateProvider/implementations/DayjsDateProvider';
import { EtherealMailProvider } from '@shared/providers/MailProvider/implementations/EtherealMailProvider';
import { UsersTokensRepository } from '@modules/accounts/infra/typeorm/repositories/UsersTokensRepository';

@injectable()
class ForgottenPasswordUseCase {
	constructor(
		@inject(DayjsDateProvider)
		private dateProvider: IDateProvider,
		@inject(EtherealMailProvider)
		private mailProvider: IMailProvider,
		@inject(UsersRepository)
		private userRepository: IUsersRepository,
		@inject(UsersTokensRepository)
		private usersTokensRepository: IUsersTokensRepository
	) {}

	async execute(email: string): Promise<void> {
		const user = await this.userRepository.findByEmail(email);

		const templatePath = resolve(__dirname, '..', '..', 'views', 'emails', 'fogottenPassword.hbs');

		if (!user) {
			throw new AppError('User does not exists!');
		}

		const token = uuidV4();

		const linkDurationTimeInHours = 3;
		const expires_date = this.dateProvider.addHours(linkDurationTimeInHours);

		await this.usersTokensRepository.create({
			user_id: user.id,
			refresh_token: token,
			expires_date: expires_date,
		});

		const templateVariables = {
			name: user.name,
			link: `http://localhost:3333/password/reset?token=${token}`,
		};

		await this.mailProvider.sendMail(email, 'Recuperação de senha', templateVariables, templatePath);
	}
}

export { ForgottenPasswordUseCase };
