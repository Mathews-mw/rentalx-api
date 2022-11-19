import { container } from 'tsyringe';
import { Request, Response } from 'express';

import { ForgottenPasswordUseCase } from './ForgottenPasswordUseCase';

class ForgottenPasswordController {
	async handle(request: Request, response: Response): Promise<Response> {
		const { email } = request.body;

		const forgottenPasswordUseCase = container.resolve(ForgottenPasswordUseCase);

		await forgottenPasswordUseCase.execute(email);

		return response.send();
	}
}

export { ForgottenPasswordController };
