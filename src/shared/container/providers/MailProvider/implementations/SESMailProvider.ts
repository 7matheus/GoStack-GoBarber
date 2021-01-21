import IMailProvider from '../models/IMailProvider';
import ISendMailDTO from '../dtos/ISendMailDTO';
import { inject, injectable } from 'tsyringe';

import IMailTemplateProvider from '../../MailTemplateProvider/models/IMailTemplateProvider';

// Aula Emails pelo Amazon SES - A partir do minuto 15.

@injectable()
export default class SESMailProvider implements IMailProvider {
  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider
  ) {}

  public async sendMail({
    to,
    from,
    subject,
    templateData
  }: ISendMailDTO): Promise<void> {}
}
