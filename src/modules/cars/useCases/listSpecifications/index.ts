import { ListSpecificationUseCase } from './ListSpecificationsUseCase';
import { ListSpecificationsControlle } from './ListSpecificationsController';
import { SpecificationsRepository } from '@modules/cars/infra/typeorm/repositories/SpecificationsRepository';

const specificationsRepository = SpecificationsRepository.getInstance();

const listSpecificationsUseCase = new ListSpecificationUseCase(specificationsRepository);

const listSpecificationsController = new ListSpecificationsControlle(listSpecificationsUseCase);

export { listSpecificationsController };
