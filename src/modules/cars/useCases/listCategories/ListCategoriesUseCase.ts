import { inject, injectable } from 'tsyringe';
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';
import { Category } from '../../infra/typeorm/entities/Category';

@injectable()
class ListCategoriesUseCase {
	constructor(
		@inject('CategoriesRepository')
		private categoriesRepository: ICategoriesRepository
	) {}

	async execute(): Promise<Category[]> {
		const categories = await this.categoriesRepository.getCategories();

		return categories;
	}
}

export { ListCategoriesUseCase };
