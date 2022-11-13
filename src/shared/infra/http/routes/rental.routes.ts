import { Router } from 'express';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { CreateRentalController } from '@modules/rentals/useCases/createRental/CreateRentalController';
import { DevolutionRentalController } from '@modules/rentals/useCases/devolutionRental/DevolutionRentalController';
import { ListRentalsByUserController } from '@modules/rentals/useCases/listRentalsByUse/ListRentalsByUserController';

const rentalRoutes = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();
const listRentalsByUsrController = new ListRentalsByUserController();

rentalRoutes.get('/user', ensureAuthenticated, listRentalsByUsrController.handle);
rentalRoutes.post('/', ensureAuthenticated, createRentalController.handle);
rentalRoutes.post('/devolution/:id', ensureAuthenticated, devolutionRentalController.handle);

export { rentalRoutes };
