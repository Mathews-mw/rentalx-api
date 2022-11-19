import { container } from 'tsyringe';
import { Request, Response } from 'express';

import { CreateUserUseCase } from './CreateUserUseCase';

class CreateUserController {
	async handle(request: Request, response: Response): Promise<Response> {
		const { name, password, email, driver_license } = request.body;

		const createUserUseCate = container.resolve(CreateUserUseCase);
		await createUserUseCate.execute({
			name,
			password,
			email,
			driver_license,
		});

		return response.status(201).send();
	}
}

export { CreateUserController };
