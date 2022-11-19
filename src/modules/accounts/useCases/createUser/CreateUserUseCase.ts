import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository';

@injectable()
class CreateUserUseCase {
	constructor(
		@inject(UsersRepository)
		private UserRepository: IUsersRepository
	) {}

	async execute(data: ICreateUserDTO): Promise<void> {
		const { name, password, email, driver_license } = data;

		const userAlreadyExists = await this.UserRepository.findByEmail(email);

		if (userAlreadyExists) {
			throw new AppError('User Already exists!');
		}

		const passwordHash = await hash(password, 8);

		await this.UserRepository.create({
			name,
			password: passwordHash,
			email,
			driver_license,
		});
	}
}

export { CreateUserUseCase };
