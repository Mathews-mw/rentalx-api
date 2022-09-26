import { Specification } from "../../entities/Specification";
import { SpecificationsRepository } from "../../repositories/implementations/SpecificationsRepository";

class ListSpecificationUseCase {

  constructor(private specificationsRepository: SpecificationsRepository) {}

  execute(): Specification[] {
    const specifications = this.specificationsRepository.getEspecifications();

    return specifications;
  }
};

export { ListSpecificationUseCase };