import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';
import { CreateCarUseCase } from './CreateCarUseCase';

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('Create Car', () => {
	beforeEach(() => {
		carsRepositoryInMemory = new CarsRepositoryInMemory();
		createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
	});

	it('Should be able to create a new car', async () => {
		const car = await createCarUseCase.execute({
			name: 'Name Car',
			description: 'Description Car',
			daily_rate: 100,
			license_plate: 'ABC-123',
			fine_amount: 50,
			brand: 'Brand Car',
			category_id: 'category',
		});

		expect(car).toHaveProperty('id');
	});

	it('Should not be able to create a car with same license plate', async () => {
		expect(async () => {
			await createCarUseCase.execute({
				name: 'Name Car1',
				description: 'Description Car',
				daily_rate: 100,
				license_plate: 'ABC-123',
				fine_amount: 50,
				brand: 'Brand Car',
				category_id: 'category',
			});

			await createCarUseCase.execute({
				name: 'Name Car2',
				description: 'Description Car',
				daily_rate: 100,
				license_plate: 'ABC-123',
				fine_amount: 50,
				brand: 'Brand Car',
				category_id: 'category',
			});
		}).rejects.toBeInstanceOf(AppError);
	});

	it('Should be able to create a new car with availability', async () => {
		const car = await createCarUseCase.execute({
			name: 'Name Car with availability',
			description: 'Description Car',
			daily_rate: 100,
			license_plate: 'DEF-456',
			fine_amount: 50,
			brand: 'Brand Car',
			category_id: 'category',
		});

		expect(car.available).toBe(true);
	});
});
