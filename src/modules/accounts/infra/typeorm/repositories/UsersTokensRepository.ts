import { Repository } from 'typeorm';
import AppDataSource from 'database/data-source';

import { UserTokens } from '../entities/UserTokens';
import { ICreateUserTokenDTO, IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';

class UsersTokensRepository implements IUsersTokensRepository {
	respository: Repository<UserTokens>;

	constructor() {
		this.respository = AppDataSource.getRepository(UserTokens);
	}

	async create({ user_id, refresh_token, expires_date }: ICreateUserTokenDTO): Promise<UserTokens> {
		const userTokens = this.respository.create({
			user_id,
			refresh_token,
			expires_date,
		});

		await this.respository.save(userTokens);

		return userTokens;
	}

	async findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UserTokens> {
		const userTokens = await this.respository.findOneBy({ user_id, refresh_token });

		return userTokens;
	}

	async deleteById(id: string): Promise<void> {
		await this.respository.delete({ id });
	}

	async findByRefreshToken(refresh_token: string): Promise<UserTokens> {
		const userToken = await this.respository.findOneBy({ refresh_token });

		return userToken;
	}
}

export { UsersTokensRepository };
