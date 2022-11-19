import { ICarRepository } from '../ICarRepository';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';

class CarsRepositoryInMemory implements ICarRepository {
	cars: Car[] = [];

	async create(data: ICreateCarDTO): Promise<Car> {
		const { id, name, description, daily_rate, license_plate, fine_amount, brand, category_id } = data;
		const newCar = new Car();

		Object.assign(newCar, {
			id,
			name,
			description,
			daily_rate,
			license_plate,
			fine_amount,
			brand,
			category_id,
		});

		this.cars.push(newCar);

		return newCar;
	}

	async listAllAvailableCars(category_id?: string, name?: string, brand?: string): Promise<Car[]> {
		const availableCars = this.cars.filter((car) => {
			if (car.available === true || (name && car.name === name) || (brand && car.brand === brand) || (category_id && car.category_id === category_id)) {
				return car;
			}
			return null;
		});

		return availableCars;
	}

	async findByLicensePlate(LICENSE_PLATE: string): Promise<Car> {
		const car = this.cars.find((car) => (car.license_plate = LICENSE_PLATE));

		return car;
	}

	async findById(id: string): Promise<Car> {
		const car = await this.cars.find((car) => car.id === id);

		return car;
	}

	async updateAvailable(id: string, available: boolean): Promise<void> {
		const findIndex = this.cars.findIndex((car) => car.id === id);

		this.cars[findIndex].available = available;
	}
}

export { CarsRepositoryInMemory };
