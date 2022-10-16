import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { CarsRepository } from '@modules/cars/infra/typeorm/repositories/CarsRepository';
import { SpecificationsRepository } from '@modules/cars/infra/typeorm/repositories/SpecificationsRepository';
import { ICarRepository } from '@modules/cars/repositories/ICarRepository';
import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository';
import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

interface IRequest {
	car_id: string;
	specifications_id: string[];
}

@injectable()
class CreateCarSpecificationUseCase {
	constructor(
		@inject(CarsRepository)
		private carRepository: ICarRepository,
		@inject(SpecificationsRepository)
		private specificationsRepository: ISpecificationsRepository
	) {}

	async execute({ car_id, specifications_id }: IRequest): Promise<Car> {
		const carExists = await this.carRepository.findById(car_id);

		if (!carExists) {
			throw new AppError('Car does not exist!');
		}

		const specifications = await this.specificationsRepository.findByIds(specifications_id);

		carExists.specifications = specifications;

		await this.carRepository.create(carExists);

		return carExists;
	}
}

export { CreateCarSpecificationUseCase };
