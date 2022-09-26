import { Repository } from "typeorm";
import AppDataSouce from '../../../../database/data-source'
import { Category } from "../../entities/Category";
import { ICategoriesRepository, ICreateCategoryDTO } from "../ICategoriesRepository";

class CategoriesRepository implements ICategoriesRepository {
  
  private repository: Repository<Category>

  constructor() {
    this.repository = AppDataSouce.getRepository(Category)
  };

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const repository = this.repository.create({
      name,
      description
    });

    await this.repository.save(repository)
  };

  async getCategories(): Promise<Category[]> {
    const categories = this.repository.find();

    return categories;
  };

  async findByName(name: string): Promise<Category> {
    const category = await this.repository.findOneBy({ name })

    return category
  }
};

export { CategoriesRepository }