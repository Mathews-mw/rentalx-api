import AppDataSource from '../../../../../database/data-source';
import { Repository } from 'typeorm';
import { Car } from '../entities/Car';
import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { ICarRepository } from '@modules/cars/repositories/ICarRepository';

class CarsRepository implements ICarRepository {
	private repository: Repository<Car>;

	constructor() {
		this.repository = AppDataSource.getRepository(Car);
	}

	async create(data: ICreateCarDTO): Promise<Car> {
		const car = this.repository.create({
			id: data.id,
			name: data.name,
			description: data.description,
			daily_rate: data.daily_rate,
			license_plate: data.license_plate,
			fine_amount: data.fine_amount,
			brand: data.brand,
			category_id: data.category_id,
			specifications: data.specifications,
		});

		await this.repository.save(car);

		return car;
	}

	async listAllAvailableCars(category_id?: string, name?: string, brand?: string): Promise<Car[]> {
		const carsQuery = await this.repository.createQueryBuilder('c').where('available = :available', { available: true });

		if (brand) {
			carsQuery.andWhere('brand = :brand', { brand: brand });
		}

		if (name) {
			carsQuery.andWhere('name = :name', { name: name });
		}

		if (category_id) {
			carsQuery.andWhere('category_id = :category_id', { category_id: category_id });
		}

		const allCars = await carsQuery.getMany();

		return allCars;
	}

	async findByLicensePlate(LICENSE_PLATE: string): Promise<Car> {
		const car = await this.repository.findOneBy({ license_plate: LICENSE_PLATE });

		return car;
	}

	async findById(id: string): Promise<Car> {
		const car = await this.repository.findOneBy({ id });

		return car;
	}
}

export { CarsRepository };
