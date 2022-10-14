import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { ICarRepository } from '../ICarRepository';

class CarsRepositoryInMemory implements ICarRepository {
	cars: Car[] = [];

	async create(data: ICreateCarDTO): Promise<Car> {
		const { name, description, daily_rate, license_plate, fine_amount, brand, category_id } = data;
		const newCar = new Car();

		Object.assign(newCar, {
			name,
			description,
			daily_rate,
			license_plate,
			fine_amount,
			brand,
			category_id,
		});

		await this.cars.push(newCar);

		return newCar;
	}

	async findByLicensePlate(LICENSE_PLATE: string): Promise<Car> {
		const car = await this.cars.find((car) => (car.license_plate = LICENSE_PLATE));

		return car;
	}
}

export { CarsRepositoryInMemory };
