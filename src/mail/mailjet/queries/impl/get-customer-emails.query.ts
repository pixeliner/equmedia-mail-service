import { SendEmailDto } from '../../dto/send-email.dto';

export class GetCustomerEmailsQuery {
  constructor(public readonly sendEmailDto: SendEmailDto) {}
}
