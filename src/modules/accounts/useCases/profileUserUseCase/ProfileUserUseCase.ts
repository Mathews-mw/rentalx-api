import { inject, injectable } from 'tsyringe';

import { User } from '@modules/accounts/infra/typeorm/entities/User';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository';
import { UserMap, UserResponseDTO } from '@modules/accounts/mapper/UserMap';

@injectable()
class ProfileUserUseCase {
	constructor(
		@inject(UsersRepository)
		private userRepository: IUsersRepository
	) {}

	async execute(id: string): Promise<UserResponseDTO> {
		const users = await this.userRepository.findById(id);

		return UserMap.toDTO(users);
	}
}

export { ProfileUserUseCase };
