import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CommandHandlers } from './commands/handlers';
import { QueryHandlers } from './queries/handlers';
import { EmailRepository } from '../../db/repositories/email.repository';
import { MailjetController } from './mailjet.controller';
import { MailjetService } from './mailjet.service';

@Module({
  imports: [TypeOrmModule.forFeature([EmailRepository]), CqrsModule],
  controllers: [MailjetController],
  providers: [
    MailjetService,
    ConfigService,
    ...QueryHandlers,
    ...CommandHandlers,
  ],
})
export class MailjetModule {}
