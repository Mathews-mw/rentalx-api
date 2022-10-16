import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListUsersUseCase } from './ListUsersUseCase';

class ListUsersController {
	async handle(request: Request, response: Response): Promise<Response> {
		const listUsersUSeCase = container.resolve(ListUsersUseCase);

		const usersList = await listUsersUSeCase.execute();

		return response.json(usersList);
	}
}

export { ListUsersController };
