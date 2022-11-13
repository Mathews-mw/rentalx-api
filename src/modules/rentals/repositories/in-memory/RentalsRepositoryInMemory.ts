import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { CreateRentalDTO, IRentalsRepository } from '../IRentalsRepository';

class RentalsRepositoryInMemory implements IRentalsRepository {
	private rentals: Rental[] = [];

	async create(data: CreateRentalDTO): Promise<Rental> {
		const { user_id, car_id, expected_return_date } = data;

		const rental = new Rental();
		Object.assign(rental, {
			user_id,
			car_id,
			expected_return_date,
			start_date: new Date(),
		});

		this.rentals.push(rental);

		return rental;
	}

	async findById(id: string): Promise<Rental> {
		const rentalById = this.rentals.find((rental) => rental.id === id);

		return rentalById;
	}

	async findOpenRentalByCar(car_id: string): Promise<Rental> {
		const rentalByCar = this.rentals.find((rental) => rental.car_id === car_id && !rental.end_date);

		return rentalByCar;
	}

	async findOpenRentalByUser(user_id: string): Promise<Rental> {
		const rentalByUser = this.rentals.find((rental) => rental.user_id === user_id && !rental.end_date);

		return rentalByUser;
	}

	async findByUserId(user_id: string): Promise<Rental[]> {
		const rentalByUserId = this.rentals.filter((rental) => {
			return rental.user_id === user_id;
		});

		return rentalByUserId;
	}
}

export { RentalsRepositoryInMemory };
