import { Specification } from '../../infra/typeorm/entities/Specification';
import { SpecificationsRepository } from '../../repositories/implementations/SpecificationsRepository';

class ListSpecificationUseCase {
	constructor(private specificationsRepository: SpecificationsRepository) {}

	execute(): Specification[] {
		const specifications = this.specificationsRepository.getEspecifications();

		//@ts-ignore
		return specifications;
	}
}

export { ListSpecificationUseCase };
