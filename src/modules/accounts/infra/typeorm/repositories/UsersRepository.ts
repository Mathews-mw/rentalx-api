import { Repository } from 'typeorm';
import AppDataSource from '../../../../../database/data-source';
import { User } from '@modules/accounts/infra/typeorm/entities/User';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';

class UsersRepository implements IUsersRepository {
	private repository: Repository<User>;

	constructor() {
		this.repository = AppDataSource.getRepository(User);
	}

	async create(data: ICreateUserDTO): Promise<void> {
		const { name, password, email, driver_license, id, avatar } = data;

		const user = this.repository.create({
			name,
			password,
			email,
			driver_license,
			id,
			avatar,
		});

		await this.repository.save(user);
	}

	async findByEmail(email: string): Promise<User> {
		const user = await this.repository.findOneBy({ email });

		return user;
	}

	async findById(id: string): Promise<User> {
		const user = await this.repository.findOneBy({ id });

		return user;
	}
}

export { UsersRepository };
