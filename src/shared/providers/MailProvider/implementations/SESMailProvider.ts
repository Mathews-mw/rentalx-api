import { injectable } from 'tsyringe';
import { SES } from 'aws-sdk';
import { IMailProvider } from '../IMailProvider';
import nodemailer, { Transporter } from 'nodemailer';
import handlebars from 'handlebars';
import fs from 'fs';

@injectable()
class SESMailProvider implements IMailProvider {
	private client: Transporter;

	constructor() {
		this.client = nodemailer.createTransport({
			SES: new SES({
				apiVersion: '2010-12-01',
				region: process.env.AWS_REGION,
			}),
		});
	}

	async sendMail(to: string, subject: string, variables: any, path: string): Promise<void> {
		const templateFileContent = fs.readFileSync(path).toString('utf-8'); // Sistema ler o caminho onde se econtra o arquivo e então converte tudo para string

		const templateParse = handlebars.compile(templateFileContent); // Handlebars vaí compilar toda essa string

		const templateHTML = templateParse(variables); // Por fim, handlebars vai pegar essa compilação e ler as variáveis contidas para gerar o HTML

		console.log('client: ', this.client);

		await this.client.sendMail({
			to,
			from: 'Rentx <devMailsTest@gmail.com>',
			subject,
			html: templateHTML,
		});
	}
}

export { SESMailProvider };
