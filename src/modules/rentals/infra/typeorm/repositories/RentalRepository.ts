import { IsNull, Repository } from 'typeorm';
import AppDataSource from '../../../../../database/data-source';

import { Rental } from '../entities/Rental';
import { CreateRentalDTO, IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';

class RentalsRepository implements IRentalsRepository {
	private repository: Repository<Rental>;

	constructor() {
		this.repository = AppDataSource.getRepository(Rental);
	}

	async create(data: CreateRentalDTO): Promise<Rental> {
		const { user_id, car_id, expected_return_date, id, end_date, total } = data;

		const newRental = this.repository.create({
			user_id,
			car_id,
			expected_return_date,
			id,
			end_date,
			total,
		});

		await this.repository.save(newRental);
		return newRental;
	}

	async findById(id: string): Promise<Rental> {
		const rentalById = await this.repository.findOneBy({ id });

		return rentalById;
	}

	async findOpenRentalByCar(car_id: string): Promise<Rental> {
		const rentalByCar = await this.repository.findOne({
			where: {
				car_id,
				end_date: IsNull(),
			},
		});

		return rentalByCar;
	}

	async findOpenRentalByUser(user_id: string): Promise<Rental> {
		const rentalByUser = await this.repository.findOne({
			where: {
				user_id,
				end_date: IsNull(),
			},
		});

		return rentalByUser;
	}

	async findByUserId(user_id: string): Promise<Rental[]> {
		const rentalByUserId = await this.repository.find({
			where: { user_id },
			relations: ['car'],
		});

		return rentalByUserId;
	}
}

export { RentalsRepository };
