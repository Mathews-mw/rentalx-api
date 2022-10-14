import { AppError } from '@shared/errors/AppError';
import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

let userRepositoryInMemory: UsersRepositoryInMemory;
let authenticateUSerUSeUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;

describe('Authenticate User', () => {
	beforeEach(() => {
		userRepositoryInMemory = new UsersRepositoryInMemory();
		authenticateUSerUSeUseCase = new AuthenticateUserUseCase(userRepositoryInMemory);
		createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
	});

	it('Should be able to authenticate an user', async () => {
		const user: ICreateUserDTO = {
			name: 'User Test',
			email: 'usertest@email.com',
			password: 'test@123',
			driver_license: '0123B',
		};

		await createUserUseCase.execute(user);

		const result = await authenticateUSerUSeUseCase.execute({
			email: user.email,
			password: user.password,
		});

		expect(result).toHaveProperty('token');
	});

	it('Should not be able to authenticate a nonexisting user', async () => {
		expect(async () => {
			await authenticateUSerUSeUseCase.execute({
				email: 'emailtest@jest.com',
				password: 'test@1234',
			});
		}).rejects.toBeInstanceOf(AppError);
	});

	it('Should not be able to authenticate with incorrect password', async () => {
		expect(async () => {
			const user: ICreateUserDTO = {
				name: 'UserToTest',
				email: 'testUser@email.com',
				password: 'test@321',
				driver_license: '0321B',
			};

			await createUserUseCase.execute(user);

			await authenticateUSerUSeUseCase.execute({
				email: user.email,
				password: '123',
			});
		}).rejects.toBeInstanceOf(AppError);
	});
});
