import { IUsersRepository } from '../IUsersRepository';
import { User } from '@modules/accounts/infra/typeorm/entities/User';
import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';

class UsersRepositoryInMemory implements IUsersRepository {
	userRepository: User[] = [];

	async create({ name, email, password, driver_license }: ICreateUserDTO): Promise<void> {
		const user = new User();
		Object.assign(user, {
			name,
			email,
			password,
			driver_license,
		});

		this.userRepository.push(user);
	}

	async getAllUsers(): Promise<User[]> {
		return this.userRepository;
	}

	async findByEmail(email: string): Promise<User> {
		const user = this.userRepository.find((user) => user.email === email);

		return user;
	}

	async findById(id: string): Promise<User> {
		const user = this.userRepository.find((user) => user.id === id);

		return user;
	}
}

export { UsersRepositoryInMemory };
