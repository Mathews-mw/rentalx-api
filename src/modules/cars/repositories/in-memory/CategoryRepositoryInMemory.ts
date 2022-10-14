import { Category } from '@modules/cars/infra/typeorm/entities/Category';
import { ICategoriesRepository, ICreateCategoryDTO } from '../ICategoriesRepository';

class CategoryRepositoryInMemory implements ICategoriesRepository {
	categories: Category[] = [];

	async findByName(name: string): Promise<Category> {
		const category = this.categories.find((category) => {
			return category.name === name;
		});

		return category;
	}
	async getCategories(): Promise<Category[]> {
		const listCategoies = this.categories;

		return listCategoies;
	}

	async create({ name, description }: ICreateCategoryDTO): Promise<void> {
		const category = new Category();

		Object.assign(category, {
			name,
			description,
		});

		this.categories.push(category);
	}
}

export { CategoryRepositoryInMemory };
