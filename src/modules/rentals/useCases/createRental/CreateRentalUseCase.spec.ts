import dayjs from 'dayjs';
import { AppError } from '@shared/errors/AppError';
import { CreateRentalUseCase } from './CreateRentalUseCase';
import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { DayjsDateProvider } from '@shared/providers/DateProvider/implementations/DayjsDateProvider';
import { RentalsRepositoryInMemory } from '@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory';

let dayJsDateProvider: DayjsDateProvider;
let createRentalUseCase: CreateRentalUseCase;
let carRepositoryInMemory: CarsRepositoryInMemory;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;

describe('Create Rental', () => {
	const dayAdd24Hours = dayjs().add(1, 'day').toDate();

	beforeEach(() => {
		dayJsDateProvider = new DayjsDateProvider();
		carRepositoryInMemory = new CarsRepositoryInMemory();
		rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
		createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory, dayJsDateProvider, carRepositoryInMemory);
	});

	it('Should be able te create a new rental car', async () => {
		const car = await carRepositoryInMemory.create({
			name: 'Test',
			description: 'Car Test',
			daily_rate: 100,
			license_plate: 'license Test',
			fine_amount: 45,
			category_id: '12347',
			brand: 'brand',
		});

		const rental = await createRentalUseCase.execute({
			user_id: '123',
			car_id: car.id,
			expected_return_date: dayAdd24Hours,
		});

		expect(rental).toHaveProperty('id');
		expect(rental).toHaveProperty('start_date');
	});

	it('Should not be able to create a new rental to the same USER', async () => {
		const car = await rentalsRepositoryInMemory.create({
			car_id: '1457a7',
			user_id: '123',
			expected_return_date: dayAdd24Hours,
		});

		await expect(() => {
			createRentalUseCase.execute({
				user_id: '123',
				car_id: '321',
				expected_return_date: dayAdd24Hours,
			});
		}).rejects.toEqual(new AppError('Já existe uma aluguel para este usuário'));
	});

	it('Should not be able to create a new rental to the same CAR', async () => {
		const car = await rentalsRepositoryInMemory.create({
			car_id: '456',
			user_id: '123',
			expected_return_date: dayAdd24Hours,
		});

		await expect(() => {
			createRentalUseCase.execute({
				user_id: '456',
				car_id: '654',
				expected_return_date: dayAdd24Hours,
			});
		}).rejects.toEqual(new AppError('Já existe uma aluguel para este usuário'));
	});

	it('Should not be able to create a new rental with invalid time', async () => {
		await expect(() => {
			createRentalUseCase.execute({
				user_id: '456',
				car_id: '654',
				expected_return_date: dayjs().toDate(),
			});
		}).rejects.toEqual(new AppError('Invalid return time'));
	});
});
