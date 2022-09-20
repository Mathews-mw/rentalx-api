import { Specification } from "../model/Specification";

interface ISpecificationDTO {
  name: string;
  description: string;
}

interface ISpecificationsRepository{
  create({name, description}: ISpecificationDTO): void;
  findByName(name: string): Specification;
  getEspecifications(): Specification[];
};

export { ISpecificationsRepository, ISpecificationDTO };