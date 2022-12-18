import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '../../repositories/IUsersRepository';
import { IStorageProvider } from '@shared/providers/Storage/IStorageProvider';
import { UsersRepository } from '../../infra/typeorm/repositories/UsersRepository';
import { LocalStorageProvider } from '@shared/providers/Storage/implementations/LocalStorageProvider';

interface IRequest {
	user_id: string;
	avatar_file: string;
}

@injectable()
class UpdateUserAvatarUseCase {
	constructor(
		@inject(UsersRepository)
		private userRepository: IUsersRepository,
		@inject(LocalStorageProvider)
		private storageProvider: IStorageProvider
	) {}

	async execute({ user_id, avatar_file }: IRequest): Promise<void> {
		const user = await this.userRepository.findById(user_id);

		/* if (user.avatar) {
			await this.storageProvider.delete(user.avatar, 'avatar');
		} */

		await this.storageProvider.save(avatar_file, 'avatar');
		user.avatar = avatar_file;

		await this.userRepository.create(user);
	}
}

export { UpdateUserAvatarUseCase };
