import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from '@modules/accounts/infra/typeorm/entities/User';
import { Category } from '@modules/cars/infra/typeorm/entities/Category';
import { Specification } from '@modules/cars/infra/typeorm/entities/Specification';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';

const AppDataSource = new DataSource({
	type: 'postgres',
	host: 'localhost',
	port: 5432,
	username: 'docker',
	password: 'ignite',
	database: 'rentx',
	synchronize: false,
	logging: false,
	entities: [Category, Specification, User, Car],
	migrations: ['./src/database/migrations/*.ts'],
	subscribers: [],
});

export function createConnection(host = 'database'): Promise<DataSource> {
	return AppDataSource.setOptions({ host }).initialize();
}

export default AppDataSource;
