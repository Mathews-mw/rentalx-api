import request from 'supertest';
import { app } from '@shared/infra/http/server';
import { Connection } from 'typeorm';
import { createConnection } from '../../../../database/data-source';
import { v4 as uuidV4 } from 'uuid';
import { hash } from 'bcryptjs';

let connection: Connection;

describe('List Category Controller', () => {
	beforeAll(async () => {
		connection = await createConnection('database_rentx');
		await connection.runMigrations();

		const id = uuidV4();
		const password = await hash('admin', 8);

		await connection.query(`
      INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
      values('${id}', 'admin', 'admin@rentx.com.br', '${password}', true, 'now()', 'XXXXXX')
    `);
	});

	afterAll(async () => {
		await connection.dropDatabase();
		await connection.destroy();
	});

	it('Should be able list all categories', async () => {
		const responseToken = await request(app).post('/sessions').send({
			email: 'admin@rentx.com.br',
			password: 'admin',
		});

		const { token } = responseToken.body;

		const response = await request(app)
			.post('/categories')
			.send({
				name: 'Category Supertest',
				description: 'Category description super test',
			})
			.set({
				Authorization: `Bearer ${token}`,
			});

		expect(response.status).toBe(201);
	});

	it('should not be able create a new category with a already existing name', async () => {
		const responseToken = await request(app).post('/sessions').send({
			email: 'admin@rentx.com.br',
			password: 'admin',
		});

		const { token } = responseToken.body;

		await request(app)
			.post('/categories')
			.send({
				name: 'Category Supertest',
				description: 'Category description super test',
			})
			.set({
				Authorization: `Bearer ${token}`,
			});

		const response = await request(app).get('/categories');

		expect(response.status).toBe(200);
		expect(response.body.length).toBe(1);
	});
});
