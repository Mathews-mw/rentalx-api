import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController';
import { UploadCarImagesController } from '@modules/cars/useCases/uploadCarImages/UploadCarImagesController';
import { ListAvailableCarsController } from '@modules/cars/useCases/listAvailableCars/ListAvailableCarsController';
import { CreateCarSpecificationController } from '@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController';

const carsRoutes = Router();

const uploadCarImages = multer(uploadConfig);

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarImagesController = new UploadCarImagesController();

carsRoutes.get('/available', listAvailableCarsController.handle);
carsRoutes.post('/', ensureAuthenticated, ensureAdmin, createCarController.handle);
carsRoutes.post('/specifications/:id', ensureAuthenticated, ensureAdmin, createCarSpecificationController.handle);
carsRoutes.post('/images/:id', ensureAuthenticated, ensureAdmin, uploadCarImages.array('images'), uploadCarImagesController.handle);

export { carsRoutes };
