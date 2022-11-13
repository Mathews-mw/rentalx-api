import { AppError } from '@shared/errors/AppError';
import { CategoryRepositoryInMemory } from '@modules/cars/repositories/in-memory/CategoryRepositoryInMemory';
import { CreateCategoryUseCase } from './CreateCategoryUseCase';

let categoriesRepositoryInMemory: CategoryRepositoryInMemory;
let createCategoryUseCase: CreateCategoryUseCase;

describe('Create Category', () => {
	beforeEach(() => {
		categoriesRepositoryInMemory = new CategoryRepositoryInMemory();
		createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositoryInMemory);
	});

	it('It should be able to create a new category', async () => {
		const category = {
			name: 'Category name Test',
			description: 'Category description Test',
		};

		await createCategoryUseCase.execute({
			name: category.name,
			description: category.description,
		});

		const categoryCreated = await categoriesRepositoryInMemory.findByName(category.name);

		expect(categoryCreated).toHaveProperty('id');
	});

	it('should not be able create a new category with a already existing name', async () => {
		const category = {
			name: 'Category name Test',
			description: 'Category description Test',
		};

		await createCategoryUseCase.execute({
			name: category.name,
			description: category.description,
		});

		await expect(() => {
			createCategoryUseCase.execute({
				name: category.name,
				description: category.description,
			});
		}).rejects.toEqual(new AppError('Category already exists!'));
	});
});
