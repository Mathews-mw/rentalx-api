import { container } from 'tsyringe';

import { ICarRepository } from '@modules/cars/repositories/ICarRepository';
import { IDateProvider } from '@shared/providers/DateProvider/IDateProvider';
import { IMailProvider } from '@shared/providers/MailProvider/IMailProvider';
import { IStorageProvider } from '@shared/providers/Storage/IStorageProvider';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { CarsRepository } from '@modules/cars/infra/typeorm/repositories/CarsRepository';
import { ICarsImagesRepository } from '@modules/cars/repositories/ICarsImagesRepository';
import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository';
import { S3StorageProvider } from '@shared/providers/Storage/implementations/S3StorageProvider';
import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository';
import { RentalsRepository } from '@modules/rentals/infra/typeorm/repositories/RentalRepository';
import { SESMailProvider } from '@shared/providers/MailProvider/implementations/SESMailProvider';
import { CategoriesRepository } from '@modules/cars/infra/typeorm/repositories/CategoriesRepository';
import { CarsImagesRepository } from '@modules/cars/infra/typeorm/repositories/CarsImagesRepository';
import { DayjsDateProvider } from '@shared/providers/DateProvider/implementations/DayjsDateProvider';
import { LocalStorageProvider } from '@shared/providers/Storage/implementations/LocalStorageProvider';
import { UsersTokensRepository } from '@modules/accounts/infra/typeorm/repositories/UsersTokensRepository';
import { EtherealMailProvider } from '@shared/providers/MailProvider/implementations/EtherealMailProvider';
import { SpecificationsRepository } from '@modules/cars/infra/typeorm/repositories/SpecificationsRepository';

const diskStorage = {
	local: LocalStorageProvider,
	s3: S3StorageProvider,
};

const mailProvider = {
	ethereal: container.resolve(EtherealMailProvider),
	ses: container.resolve(SESMailProvider),
};

container.registerSingleton<ICarRepository>('CarRepository', CarsRepository);
container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository);
container.registerSingleton<IDateProvider>('DayjsDateProvider', DayjsDateProvider);
container.registerSingleton<IRentalsRepository>('RentalsRepository', RentalsRepository);
container.registerSingleton<ICategoriesRepository>('CategoriesRepository', CategoriesRepository);
container.registerSingleton<ICarsImagesRepository>('CarsImagesRepository', CarsImagesRepository);
container.registerInstance<IMailProvider>('MailProvider', mailProvider[process.env.MAIL_PROVIDER]);
container.registerSingleton<IUsersTokensRepository>('UsersTokensRepository', UsersTokensRepository);
container.registerSingleton<IStorageProvider>('LocalStorageProvider', diskStorage[process.env.disk]);
container.registerSingleton<ISpecificationsRepository>('SpecificationsRepository', SpecificationsRepository);
container.registerSingleton<ISpecificationsRepository>('SpecificationsRepository', SpecificationsRepository);
