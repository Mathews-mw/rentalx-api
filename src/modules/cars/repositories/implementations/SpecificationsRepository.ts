import { ISpecificationDTO, ISpecificationsRepository } from "../ISpecificationsRepository";
import { Specification } from '../../model/Specification'
import { CategoriesRepository } from "./CategoriesRepository";

class SpecificationsRepository implements ISpecificationsRepository {
  
  private specifications: Specification[];

  private static INSTANCE: SpecificationsRepository;

  private constructor() {
    this.specifications = [];
  };

  public static getInstance(): SpecificationsRepository {
    if(!SpecificationsRepository.INSTANCE) {
      SpecificationsRepository.INSTANCE = new SpecificationsRepository();
    }

    return SpecificationsRepository.INSTANCE;
  }
   
  create({ name, description }: ISpecificationDTO): void {
    const specification = new Specification();

    Object.assign(specification, {
      name: name,
      description: description,
      created_at: new Date(),
    });

    this.specifications.push(specification);
  };

  findByName(name: string): Specification {
    const specification = this.specifications.find(specification => {
      return specification.name === name
    })

    return specification
  };

  getEspecifications(): Specification[] {
    return this.specifications;
  }; 
};

export { SpecificationsRepository }; 