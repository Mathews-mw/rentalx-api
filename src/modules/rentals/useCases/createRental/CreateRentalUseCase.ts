import { CarsRepository } from '@modules/cars/infra/typeorm/repositories/CarsRepository';
import { ICarRepository } from '@modules/cars/repositories/ICarRepository';
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { RentalsRepository } from '@modules/rentals/infra/typeorm/repositories/RentalRepository';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { AppError } from '@shared/errors/AppError';
import { IDateProvider } from '@shared/providers/DateProvider/IDateProvider';
import { DayjsDateProvider } from '@shared/providers/DateProvider/implementations/DayjsDateProvider';
import { inject, injectable } from 'tsyringe';

interface IRequest {
	user_id: string;
	car_id: string;
	expected_return_date: Date;
}

@injectable()
class CreateRentalUseCase {
	constructor(
		@inject(RentalsRepository)
		private rentalsrepository: IRentalsRepository,
		@inject(DayjsDateProvider)
		private dateProvider: IDateProvider,
		@inject(CarsRepository)
		private carRepository: ICarRepository
	) {}

	async execute({ user_id, car_id, expected_return_date }: IRequest): Promise<Rental> {
		const carUnavailable = await this.rentalsrepository.findOpenRentalByCar(car_id);

		if (carUnavailable) {
			throw new AppError('Carro indisponível');
		}

		const rentalOpenToUser = await this.rentalsrepository.findOpenRentalByUser(user_id);

		if (rentalOpenToUser) {
			throw new AppError('Já existe uma aluguel para este usuário');
		}

		const minimunHour = 24;
		const dateNow = this.dateProvider.dateNow();
		const compare = this.dateProvider.compareInHours(dateNow, expected_return_date);

		if (compare < minimunHour) {
			throw new AppError('Invalid return time');
		}

		const rental = await this.rentalsrepository.create({
			user_id,
			car_id,
			expected_return_date,
		});

		await this.carRepository.updateAvailable(car_id, false);

		return rental;
	}
}

export { CreateRentalUseCase };
