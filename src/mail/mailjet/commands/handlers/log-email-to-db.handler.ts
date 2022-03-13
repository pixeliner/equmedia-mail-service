import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { RpcException } from '@nestjs/microservices';

import { EmailRepository } from '../../../../db/repositories/email.repository';
import { LogEmailToDbCommand } from '../impl';

@CommandHandler(LogEmailToDbCommand)
export class LogEmailToDbHandler
  implements ICommandHandler<LogEmailToDbCommand>
{
  constructor(
    @InjectRepository(EmailRepository)
    private readonly emailRepository: EmailRepository,
  ) {}

  async execute(command: LogEmailToDbCommand) {
    const { user_email, email_type, subject, text } = command.emailObject;

    const email = this.emailRepository.create();
    email.user_email = user_email;
    email.email_type = email_type;
    email.subject = subject;
    email.text = text;
    email.timestamp = new Date();

    try {
      await email.save();
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
