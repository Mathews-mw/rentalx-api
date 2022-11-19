import { In, Repository } from 'typeorm';

import { Specification } from '../entities/Specification';
import AppDataSource from '../../../../../database/data-source';
import { ISpecificationDTO, ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository';

class SpecificationsRepository implements ISpecificationsRepository {
	private repository: Repository<Specification>;

	constructor() {
		this.repository = AppDataSource.getRepository(Specification);
	}

	async create({ name, description }: ISpecificationDTO): Promise<Specification> {
		const specification = this.repository.create({
			name,
			description,
		});

		await this.repository.save(specification);

		return specification;
	}

	async getEspecifications(): Promise<Specification[]> {
		const specifications = await this.repository.find();

		return specifications;
	}

	async findByName(name: string): Promise<Specification> {
		const specification = await this.repository.findOneBy({ name });

		return specification;
	}

	async findByIds(ids: string[]): Promise<Specification[]> {
		const specifications = await this.repository.findBy({
			id: In(ids),
		});

		return specifications;
	}
}

export { SpecificationsRepository };
