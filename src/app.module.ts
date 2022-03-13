import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DbModule } from './db/db.module';
import { HealthModule } from './health/health.module';
import { MailjetModule } from './mail/mailjet/mailjet.module';

@Module({
  imports: [ConfigModule.forRoot(), DbModule, MailjetModule, HealthModule],
})
export class AppModule {}
