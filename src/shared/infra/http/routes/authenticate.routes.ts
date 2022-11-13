import { Router } from 'express';

import { RefreshTokenController } from '@modules/accounts/useCases/refreshToken/RefreshTokenController';
import { AuthenticateUserController } from '@modules/accounts/useCases/authenticateUser/AuthenticateUserController';

const authenticateRoutes = Router();

const refreshTokenController = new RefreshTokenController();
const authenticateUserController = new AuthenticateUserController();

authenticateRoutes.post('/sessions', authenticateUserController.handle);

authenticateRoutes.post('/refresh-token', refreshTokenController.handle);

export { authenticateRoutes };
