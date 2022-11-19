import { inject, injectable } from 'tsyringe';

import { User } from '@modules/accounts/infra/typeorm/entities/User';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository';

@injectable()
class ListUsersUseCase {
	constructor(
		@inject(UsersRepository)
		private userRepository: IUsersRepository
	) {}

	async execute(): Promise<User[]> {
		const users = await this.userRepository.getAllUsers();

		return users;
	}
}

export { ListUsersUseCase };
