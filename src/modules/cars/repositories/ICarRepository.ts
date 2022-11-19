import { Car } from '../infra/typeorm/entities/Car';
import { ICreateCarDTO } from '../dtos/ICreateCarDTO';

interface ICarRepository {
	create(data: ICreateCarDTO): Promise<Car>;
	findByLicensePlate(LICENSE_PLATE: string): Promise<Car>;
	listAllAvailableCars(category_id?: string, name?: string, brand?: string): Promise<Car[]>;
	findById(id: string): Promise<Car>;
	updateAvailable(id: string, available: boolean): Promise<void>;
}

export { ICarRepository };
