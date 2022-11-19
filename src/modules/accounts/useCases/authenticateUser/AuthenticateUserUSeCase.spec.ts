import { AppError } from '@shared/errors/AppError';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';
import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { UsersTookensRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersTookensRepositoryInMemory';
import { DayjsDateProvider } from '@shared/providers/DateProvider/implementations/DayjsDateProvider';

let dateProvider: DayjsDateProvider;
let createUserUseCase: CreateUserUseCase;
let userRepositoryInMemory: UsersRepositoryInMemory;
let authenticateUSerUSeUseCase: AuthenticateUserUseCase;
let usersTokensRepositoryInMemory: UsersTookensRepositoryInMemory;

describe('Authenticate User', () => {
	beforeEach(() => {
		dateProvider = new DayjsDateProvider();
		userRepositoryInMemory = new UsersRepositoryInMemory();
		usersTokensRepositoryInMemory = new UsersTookensRepositoryInMemory();
		createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
		authenticateUSerUSeUseCase = new AuthenticateUserUseCase(userRepositoryInMemory, usersTokensRepositoryInMemory, dateProvider);
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
		await expect(() => {
			authenticateUSerUSeUseCase.execute({
				email: 'emailtest@jest.com',
				password: 'test@1234',
			});
		}).rejects.toEqual(new AppError('Email or password incorrect!'));
	});

	it('Should not be able to authenticate with incorrect password', async () => {
		const user: ICreateUserDTO = {
			name: 'UserToTest',
			email: 'testUser@email.com',
			password: 'test@321',
			driver_license: '0321B',
		};

		await createUserUseCase.execute(user);

		await expect(() => {
			authenticateUSerUSeUseCase.execute({
				email: user.email,
				password: '123',
			});
		}).rejects.toEqual(new AppError('Email or password incorrect!'));
	});
});
