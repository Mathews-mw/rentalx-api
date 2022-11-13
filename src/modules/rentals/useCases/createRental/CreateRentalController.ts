import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateRentalUseCase } from './CreateRentalUseCase';

class CreateRentalController {
	async handle(request: Request, response: Response): Promise<Response> {
		const { id } = request.user;
		const { expected_return_date, car_id } = request.body;

		console.log(id);

		const createRentalUseCase = container.resolve(CreateRentalUseCase);
		const rental = createRentalUseCase.execute({
			user_id: id,
			expected_return_date,
			car_id,
		});

		return response.status(201).json(rental);
	}
}

export { CreateRentalController };
