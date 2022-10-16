import { SpecificationsRepository } from '@modules/cars/infra/typeorm/repositories/SpecificationsRepository';
import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository';
import { inject, injectable } from 'tsyringe';
import { Specification } from '../../infra/typeorm/entities/Specification';

@injectable()
class ListSpecificationUseCase {
	constructor(
		@inject(SpecificationsRepository)
		private specificationsRepository: ISpecificationsRepository
	) {}

	async execute(): Promise<Specification[]> {
		const specifications = await this.specificationsRepository.getEspecifications();

		return specifications;
	}
}

export { ListSpecificationUseCase };
