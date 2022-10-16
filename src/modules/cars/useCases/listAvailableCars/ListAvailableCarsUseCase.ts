import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { CarsRepository } from '@modules/cars/infra/typeorm/repositories/CarsRepository';
import { ICarRepository } from '@modules/cars/repositories/ICarRepository';
import { inject, injectable } from 'tsyringe';

interface IRequest {
	category_id?: string;
	name?: string;
	brand?: string;
}

@injectable()
class ListAvailableCarsUseCase {
	constructor(
		@inject(CarsRepository)
		private carRepository: ICarRepository
	) {}

	async execute({ category_id, name, brand }: IRequest): Promise<Car[]> {
		const cars = await this.carRepository.listAllAvailableCars(category_id, name, brand);

		return cars;
	}
}

export { ListAvailableCarsUseCase };
