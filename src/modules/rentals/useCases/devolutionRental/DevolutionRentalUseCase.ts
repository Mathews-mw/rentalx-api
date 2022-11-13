import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { ICarRepository } from '@modules/cars/repositories/ICarRepository';
import { IDateProvider } from '@shared/providers/DateProvider/IDateProvider';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { CarsRepository } from '@modules/cars/infra/typeorm/repositories/CarsRepository';
import { RentalsRepository } from '@modules/rentals/infra/typeorm/repositories/RentalRepository';
import { DayjsDateProvider } from '@shared/providers/DateProvider/implementations/DayjsDateProvider';

interface IRequest {
	id: string;
	user_id: string;
}

@injectable()
class DevolutionRentalUseCase {
	constructor(
		@inject(RentalsRepository)
		private renstalsRepository: IRentalsRepository,
		@inject(CarsRepository)
		private carsRepository: ICarRepository,
		@inject(DayjsDateProvider)
		private dateProvider: IDateProvider
	) {}

	async execute({ id, user_id }: IRequest): Promise<Rental> {
		const rental = await this.renstalsRepository.findById(id);
		const car = await this.carsRepository.findById(rental.car_id);
		const minimunDaily = 1;

		if (!rental) {
			throw new AppError('Rental does not exists!');
		}

		// verificar o tempo de aluguel

		const dateNow = this.dateProvider.dateNow();

		let daily = this.dateProvider.compareInDays(rental.start_date, this.dateProvider.dateNow());

		if (daily <= 0) {
			daily = minimunDaily;
		}

		const delay = this.dateProvider.compareInDays(dateNow, rental.expected_return_date);

		let total = 0;

		if (delay > 0) {
			const calculateFine = delay * car.fine_amount;
			total = calculateFine;
		}

		total += daily * car.daily_rate;

		rental.end_date = this.dateProvider.dateNow();
		rental.total = total;

		await this.renstalsRepository.create(rental);
		await this.carsRepository.updateAvailable(car.id, true);

		return rental;
	}
}

export { DevolutionRentalUseCase };
