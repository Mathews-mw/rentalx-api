import { UserTokens } from '@modules/accounts/infra/typeorm/entities/UserTokens';
import { ICreateUserTokenDTO, IUsersTokensRepository } from '../IUsersTokensRepository';

class UsersTookensRepositoryInMemory implements IUsersTokensRepository {
	usersTokens: UserTokens[] = [];

	async create({ user_id, refresh_token, expires_date }: ICreateUserTokenDTO): Promise<UserTokens> {
		const newUserToken = new UserTokens();

		Object.assign(newUserToken, {
			user_id,
			refresh_token,
			expires_date,
		});

		this.usersTokens.push(newUserToken);

		return newUserToken;
	}

	async findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UserTokens> {
		const userTokens = this.usersTokens.find((userToken) => {
			return userToken.user_id === user_id && userToken.refresh_token === refresh_token;
		});

		return userTokens;
	}

	async findByRefreshToken(refresh_token: string): Promise<UserTokens> {
		const userTokens = this.usersTokens.find((userToken) => userToken.refresh_token === refresh_token);

		return userTokens;
	}

	async deleteById(id: string): Promise<void> {
		const userTokenToRemove = this.usersTokens.find((userToken) => userToken.id === id);

		this.usersTokens.splice(this.usersTokens.indexOf(userTokenToRemove));
	}
}

export { UsersTookensRepositoryInMemory };
