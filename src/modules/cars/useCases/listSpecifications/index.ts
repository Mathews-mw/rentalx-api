import { SpecificationsRepository } from "../../repositories/implementations/SpecificationsRepository";
import { ListSpecificationsControlle } from "./ListSpecificationsController";
import { ListSpecificationUseCase } from "./ListSpecificationsUseCase";

const specificationsRepository = SpecificationsRepository.getInstance();

const listSpecificationsUseCase = new ListSpecificationUseCase(specificationsRepository);

const listSpecificationsController = new ListSpecificationsControlle(listSpecificationsUseCase);

export { listSpecificationsController };