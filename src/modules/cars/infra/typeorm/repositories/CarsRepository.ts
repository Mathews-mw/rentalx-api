import { Repository } from 'typeorm';
import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { ICarRepository } from '@modules/cars/repositories/ICarRepository';
import { Car } from '../entities/Car';
import AppDataSource from 'database/data-source';

class CarsRepository implements ICarRepository {
	private repository: Repository<Car>;

	constructor() {
		this.repository = AppDataSource.getRepository(Car);
	}

	async create(data: ICreateCarDTO): Promise<Car> {
		const car = this.repository.create({
			name: data.name,
			description: data.description,
			daily_rate: data.daily_rate,
			license_plate: data.license_plate,
			fine_amount: data.fine_amount,
			brand: data.brand,
			category_id: data.category_id,
		});

		await this.repository.save(car);

		return car;
	}

	async findByLicensePlate(LICENSE_PLATE: string): Promise<Car> {
		const car = await this.repository.findOneBy({ license_plate: LICENSE_PLATE });

		return car;
	}
}

export { CarsRepository };
