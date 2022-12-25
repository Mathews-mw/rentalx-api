import { instanceToInstance } from 'class-transformer';
import { User } from '../infra/typeorm/entities/User';

export interface UserResponseDTO {
	email: string;
	name: string;
	id: string;
	avatar: string;
	driver_license: string;
	avatar_url(): string;
}

class UserMap {
	static toDTO({ email, name, id, avatar, driver_license, avatar_url }: User): UserResponseDTO {
		const user = instanceToInstance({
			email,
			name,
			id,
			avatar,
			driver_license,
			avatar_url,
		});

		return user;
	}
}

export { UserMap };
