import { Repository } from 'typeorm'
import { ISpecificationDTO, ISpecificationsRepository } from "../ISpecificationsRepository";
import { Specification } from '../../entities/Specification'
import { CategoriesRepository } from "./CategoriesRepository";
import AppDataSource from '../../../../database/data-source';

class SpecificationsRepository implements ISpecificationsRepository {
  
  private repository: Repository<Specification> 

  private static INSTANCE: SpecificationsRepository;

  constructor() {
    this.repository = AppDataSource.getRepository(Specification)
  };

  public static getInstance(): SpecificationsRepository {
    if(!SpecificationsRepository.INSTANCE) {
      SpecificationsRepository.INSTANCE = new SpecificationsRepository();
    }

    return SpecificationsRepository.INSTANCE;
  }
   
  async create({ name, description }: ISpecificationDTO): Promise<void> {
    const specification = this.repository.create({
      name,
      description,
    });

    await this.repository.save(specification);
  };

  async findByName(name: string): Promise<Specification> {
    const specification = await this.repository.findOneBy({ name })

    return specification
  };

  async getEspecifications(): Promise<Specification[]> {
    const specifications = this.repository.find();

    return specifications;
  }; 
};

export { SpecificationsRepository }; 