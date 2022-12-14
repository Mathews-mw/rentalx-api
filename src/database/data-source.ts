import 'reflect-metadata';
import { DataSource } from 'typeorm';

import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { User } from '@modules/accounts/infra/typeorm/entities/User';
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { Category } from '@modules/cars/infra/typeorm/entities/Category';
import { CarImage } from '@modules/cars/infra/typeorm/entities/CarImage';
import { UserTokens } from '@modules/accounts/infra/typeorm/entities/UserTokens';
import { Specification } from '@modules/cars/infra/typeorm/entities/Specification';

const AppDataSource = new DataSource({
	type: 'postgres',
	host: 'localhost',
	port: 5432,
	username: 'docker',
	password: 'ignite',
	database: 'rentx',
	synchronize: false,
	logging: false,
	entities: [Category, Specification, User, Car, Rental, UserTokens, CarImage],
	migrations: ['./src/database/migrations/*.ts'],
	subscribers: [],
});

export function createConnection(): Promise<DataSource> {
	return AppDataSource.setOptions({
		database: process.env.NODE_ENV === 'supertest' ? 'rentx_supertest' : 'rentx',
	}).initialize();
}

export default AppDataSource;
