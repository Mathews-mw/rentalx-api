import { ICreateCarDTO } from '../dtos/ICreateCarDTO';
import { Car } from '../infra/typeorm/entities/Car';

interface ICarRepository {
	create(data: ICreateCarDTO): Promise<Car>;
	findByLicensePlate(LICENSE_PLATE: string): Promise<Car>;
}

export { ICarRepository };
