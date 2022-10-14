import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { User } from '@modules/accounts/infra/typeorm/entities/User';
import { IUsersRepository } from '../IUsersRepository';

class UsersRepositoryInMemory implements IUsersRepository {
	userREpository: User[] = [];

	async create({ name, email, password, driver_license }: ICreateUserDTO): Promise<void> {
		const user = new User();
		Object.assign(user, {
			name,
			email,
			password,
			driver_license,
		});

		this.userREpository.push(user);
	}

	async findByEmail(email: string): Promise<User> {
		const user = this.userREpository.find((user) => user.email === email);

		return user;
	}

	async findById(id: string): Promise<User> {
		const user = this.userREpository.find((user) => user.id === id);

		return user;
	}
}

export { UsersRepositoryInMemory };
