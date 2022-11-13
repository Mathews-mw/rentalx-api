import { Rental } from '../infra/typeorm/entities/Rental';

export interface CreateRentalDTO {
	user_id: string;
	car_id: string;
	expected_return_date: Date;
	id?: string;
	end_date?: Date;
	total?: number;
}

export interface IRentalsRepository {
	create(data: CreateRentalDTO): Promise<Rental>;
	findById(id: string): Promise<Rental>;
	findOpenRentalByCar(car_id: string): Promise<Rental>;
	findOpenRentalByUser(user_id: string): Promise<Rental>;
	findByUserId(user_id: string): Promise<Rental[]>;
}
