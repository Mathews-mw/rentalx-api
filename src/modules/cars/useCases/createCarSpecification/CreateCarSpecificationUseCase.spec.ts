import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { SpecificationsRepostiroryInMemory } from '@modules/cars/repositories/in-memory/SpecificationsRepostiroryInMemory';
import { AppError } from '@shared/errors/AppError';
import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase';

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationsRepostiroryInMemory;

describe('Create car specification', () => {
	beforeEach(() => {
		carsRepositoryInMemory = new CarsRepositoryInMemory();
		specificationsRepositoryInMemory = new SpecificationsRepostiroryInMemory();
		createCarSpecificationUseCase = new CreateCarSpecificationUseCase(carsRepositoryInMemory, specificationsRepositoryInMemory);
	});

	it('should not be possible to add a new specification for a non existing car', async () => {
		expect(async () => {
			const car_id = '123';
			const specifications_id = ['456'];
			await createCarSpecificationUseCase.execute({ car_id, specifications_id });
		}).rejects.toBeInstanceOf(AppError);
	});

	it('will it be possible to add a new specification for a car', async () => {
		const car = await carsRepositoryInMemory.create({
			name: 'Name Car',
			description: 'Description Car',
			daily_rate: 100,
			license_plate: 'ABC-123',
			fine_amount: 50,
			brand: 'Brand Car',
			category_id: 'category',
		});

		const specification = await specificationsRepositoryInMemory.create({
			name: 'Test',
			description: 'Specification test',
		});

		const specifications_id = [specification.id];
		const specificationsCars = await createCarSpecificationUseCase.execute({ car_id: car.id, specifications_id });

		expect(specificationsCars).toHaveProperty('specifications');
		expect(specificationsCars.specifications.length).toBe(1);
	});
});
