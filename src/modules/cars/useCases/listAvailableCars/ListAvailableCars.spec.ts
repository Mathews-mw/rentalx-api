import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase';
import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('List Cars', () => {
	beforeEach(() => {
		carsRepositoryInMemory = new CarsRepositoryInMemory();
		listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
	});

	it('should be able to list all available cars', async () => {
		const car = await carsRepositoryInMemory.create({
			name: 'Test Car',
			description: 'Carro de passeio, mais conforto, para até 5 pessoas',
			daily_rate: 77.0,
			license_plate: 'BVF-8986',
			fine_amount: 38.0,
			brand: 'Car_brand',
			category_id: 'category_id',
		});

		const cars = await listAvailableCarsUseCase.execute({});

		expect(cars).toEqual([car]);
	});

	it('should be able to list all available cars by brand', async () => {
		const car = await carsRepositoryInMemory.create({
			name: 'Test Car2',
			description: 'Carro de passeio, mais conforto, para até 5 pessoas',
			daily_rate: 77.0,
			license_plate: 'BVF-8976',
			fine_amount: 38.0,
			brand: 'Car2_brand',
			category_id: 'category_id',
		});

		const cars = await listAvailableCarsUseCase.execute({
			brand: 'Car2_brand',
		});

		expect(cars).toEqual([car]);
	});

	it('should be able to list all available cars by name', async () => {
		const car = await carsRepositoryInMemory.create({
			name: 'Test Car3',
			description: 'Carro de passeio, mais conforto, para até 5 pessoas',
			daily_rate: 77.0,
			license_plate: 'BVG-8986',
			fine_amount: 38.0,
			brand: 'Car3_brand',
			category_id: 'category_id',
		});

		const cars = await listAvailableCarsUseCase.execute({
			name: 'Test Car3',
		});

		expect(cars).toEqual([car]);
	});

	it('should be able to list all available cars by category', async () => {
		const car = await carsRepositoryInMemory.create({
			name: 'Test Car4',
			description: 'Carro de passeio, mais conforto, para até 5 pessoas',
			daily_rate: 77.0,
			license_plate: 'DVG-8986',
			fine_amount: 38.0,
			brand: 'Car4_brand',
			category_id: 'category_id_test',
		});

		const cars = await listAvailableCarsUseCase.execute({
			category_id: 'category_id_test',
		});

		expect(cars).toEqual([car]);
	});
});
