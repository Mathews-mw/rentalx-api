import { AppError } from '@shared/errors/AppError';
import { ForgottenPasswordUseCase } from './ForgottenPasswordUseCase';
import { DayjsDateProvider } from '@shared/providers/DateProvider/implementations/DayjsDateProvider';
import { MailProviderInMemory } from '@shared/providers/MailProvider/in-memory/MailProviderInMemory';
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { UsersTookensRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersTookensRepositoryInMemory';

let dateProvider: DayjsDateProvider;
let mailProviderInMemory: MailProviderInMemory;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let forgottenPasswordUseCase: ForgottenPasswordUseCase;
let usersTokensRepositoryInMemory: UsersTookensRepositoryInMemory;

describe('Send Forgot Email', () => {
	beforeEach(() => {
		dateProvider = new DayjsDateProvider();
		mailProviderInMemory = new MailProviderInMemory();
		usersRepositoryInMemory = new UsersRepositoryInMemory();
		usersTokensRepositoryInMemory = new UsersTookensRepositoryInMemory();
		forgottenPasswordUseCase = new ForgottenPasswordUseCase(usersRepositoryInMemory, usersTokensRepositoryInMemory, dateProvider, mailProviderInMemory);
	});

	it('Should be able to send a forgot password email to user', async () => {
		const sendMail = spyOn(mailProviderInMemory, 'sendMail');

		await usersRepositoryInMemory.create({
			driver_license: '638-3445',
			name: 'Hallie Houston',
			email: 'ko@lom.uk',
			password: '452YB3',
		});

		forgottenPasswordUseCase.execute('Hallie Houston');

		expect(sendMail).toHaveBeenCalled();
	});

	it('Should not be able to send an email to unexists user', async () => {
		await expect(forgottenPasswordUseCase.execute('ko@lom.uk')).rejects.toEqual(new AppError('User does not exists!'));
	});

	it('Should be able to create an user token', async () => {
		const generateTokenEmail = spyOn(usersTokensRepositoryInMemory, 'create');

		await usersRepositoryInMemory.create({
			driver_license: 'F018-A6',
			name: 'Corey Phelps',
			email: 'ivte@fele.lu',
			password: 'LTHSHGOT',
		});

		await forgottenPasswordUseCase.execute('ivte@fele.lu');

		expect(generateTokenEmail).toBeCalled();
	});
});
