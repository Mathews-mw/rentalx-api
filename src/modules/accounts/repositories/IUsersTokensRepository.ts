import { UserTokens } from '../infra/typeorm/entities/UserTokens';

export interface ICreateUserTokenDTO {
	user_id: string;
	refresh_token: string;
	expires_date: Date;
}

export interface IUsersTokensRepository {
	create({ user_id, refresh_token, expires_date }: ICreateUserTokenDTO): Promise<UserTokens>;
	findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UserTokens>;
	deleteById(id: string): Promise<void>;
}
