import { Router } from 'express';

import { ForgottenPasswordController } from '@modules/accounts/useCases/ForgottenPasswordUser/ForgottenPasswordController';
import { ResetPasswordUserController } from '@modules/accounts/useCases/resetPassword/ResetPasswordUserController';

const passwordRoutes = Router();

const forgottenPasswordController = new ForgottenPasswordController();
const resetPasswordUserController = new ResetPasswordUserController();

passwordRoutes.post('/forgot', forgottenPasswordController.handle);
passwordRoutes.post('/reset', resetPasswordUserController.handle);

export { passwordRoutes };
