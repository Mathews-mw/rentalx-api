import { Category } from '@modules/cars/infra/typeorm/entities/Category';

// DTO => Data Transfer Object
interface ICreateCategoryDTO {
	name: string;
	description: string;
}

interface ICategoriesRepository {
	findByName(name: string): Promise<Category>;
	getCategories(): Promise<Category[]>;
	create({ name, description }: ICreateCategoryDTO): Promise<void>;
}

export { ICategoriesRepository, ICreateCategoryDTO };
