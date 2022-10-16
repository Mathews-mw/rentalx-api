import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListSpecificationUseCase } from './ListSpecificationsUseCase';

class ListSpecificationsControlle {
	async handle(request: Request, response: Response): Promise<Response> {
		const listSpecificationsUseCase = container.resolve(ListSpecificationUseCase);

		const listAllSpecifications = await listSpecificationsUseCase.execute();

		return response.json(listAllSpecifications);
	}
}

export { ListSpecificationsControlle };
