import fs from 'fs';
import { resolve } from 'path';
import upload from '@config/upload';
import { IStorageProvider } from '../IStorageProvider';

class LocalStorageProvider implements IStorageProvider {
	async save(file: string, folder: string): Promise<string> {
		await fs.promises.rename(resolve(upload.tmpFolder, file), resolve(upload.tmpFolder, folder, file));

		console.log('file: ', file);
		return file;
	}

	async delete(file: string, folder: string): Promise<void> {
		const fileName = resolve(upload.tmpFolder, folder, file);
		console.log('to delete: ', fileName);
		try {
			await fs.promises.stat(fileName);
		} catch (error) {
			return;
		}

		await fs.promises.unlink(fileName);
	}
}

export { LocalStorageProvider };
