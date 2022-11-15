import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ResetPasswordUserUseCase } from './ResetPasswordUserUseCase';

class ResetPasswordUserController {
	async handle(request: Request, response: Response): Promise<Response> {
		const token = request.params.token;
		const { password } = request.body;

		const resetPasswordUserUseCase = container.resolve(ResetPasswordUserUseCase);

		await resetPasswordUserUseCase.execute({ token, password });

		return response.json({ message: 'Senha alterada com sucesso!' });
	}
}

export { ResetPasswordUserController };
