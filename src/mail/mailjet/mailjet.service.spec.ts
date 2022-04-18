import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

import { MailjetService } from './mailjet.service';

// TODO: test mailService
/* this.mailjetClient = connect(
  this.configService.get('MJ_APIKEY_PUBLIC'), <- empty on initialization
  this.configService.get('MJ_APIKEY_SECRET'),
); */

xdescribe('MailjetService', () => {
  let service: MailjetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule, CqrsModule],
      providers: [MailjetService],
    }).compile();

    service = module.get<MailjetService>(MailjetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
