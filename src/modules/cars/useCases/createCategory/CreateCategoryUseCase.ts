import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../shared/errors/AppError';
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';
import { CategoriesRepository } from '../../infra/typeorm/repositories/CategoriesRepository';

interface IRequest {
	name: string;
	description: string;
}

@injectable()
class CreateCategoryUseCase {
	constructor(
		@inject(CategoriesRepository)
		private categoriesRepository: ICategoriesRepository
	) {}

	async execute({ name, description }: IRequest): Promise<void> {
		const categoryAlredyExist = await this.categoriesRepository.findByName(name);

		if (categoryAlredyExist) {
			throw new AppError('Category Alredy Exist!');
		}

		this.categoriesRepository.create({ name, description });
	}
}

export { CreateCategoryUseCase };
