import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateRentals1666475847261 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'retanls',
				columns: [
					{
						name: 'id',
						type: 'uuid',
						isPrimary: true,
					},
					{
						name: 'car_id',
						type: 'uuid',
					},
					{
						name: 'user_id',
						type: 'uuid',
					},
					{
						name: 'start_date',
						type: 'timestamp',
						default: 'now()',
					},
					{
						name: 'end_date',
						type: 'date',
						isNullable: true,
					},
					{
						name: 'expected_return_date',
						type: 'date',
					},
					{
						name: 'total',
						type: 'numeric',
						isNullable: true,
					},
					{
						name: 'created_at',
						type: 'timestamp',
						default: 'now()',
					},
					{
						name: 'updated_at',
						type: 'date',
					},
				],
				foreignKeys: [
					{
						name: 'FKCarRental',
						referencedTableName: 'cars',
						referencedColumnNames: ['id'],
						columnNames: ['car_id'],
						onDelete: 'SET NULL',
						onUpdate: 'SET NULL',
					},
					{
						name: 'FKUserRental',
						referencedTableName: 'users',
						referencedColumnNames: ['id'],
						columnNames: ['user_id'],
						onDelete: 'SET NULL',
						onUpdate: 'SET NULL',
					},
				],
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('retanls');
	}
}
