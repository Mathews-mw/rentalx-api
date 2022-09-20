import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";

interface IRequest {
  name: string;
  description: string;
}

class CreateSpecificationUseCase {
    
  constructor(private specificationsRepository: ISpecificationsRepository) {};

  execute({name, description}: IRequest) {
    const specificationAlredyExist = this.specificationsRepository.findByName(name)

    if(specificationAlredyExist) {
      throw new Error('Specification alredy exist!')
    }
    
    this.specificationsRepository.create({name, description});
  };

}

export { CreateSpecificationUseCase };