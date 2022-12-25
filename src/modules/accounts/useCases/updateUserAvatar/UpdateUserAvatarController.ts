import { container } from 'tsyringe';
import { Request, Response } from 'express';

import { UpdateUserAvatarUseCase } from './UpdateUserAvatarUseCase';

class UpdateUserAvatarController {
	async handle(request: Request, response: Response): Promise<Response> {
		const { id } = request.user;
		const avatar_file = request.file.filename;

		const updateUserAvatarUseCase = container.resolve(UpdateUserAvatarUseCase);
		try {
			await updateUserAvatarUseCase.execute({ user_id: id, avatar_file });

			return response.status(204).send();
		} catch (error) {
			console.log(error);
			return response.status(400).json({ error: 'Erro ao tentar adicionar imagem' });
		}
	}
}

export { UpdateUserAvatarController };
