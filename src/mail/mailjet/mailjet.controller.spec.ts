import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

import { MailjetController } from './mailjet.controller';
import { MailjetService } from './mailjet.service';

// TODO: test mailService
/* this.mailjetClient = connect(
  this.configService.get('MJ_APIKEY_PUBLIC'), <- empty on initialization
  this.configService.get('MJ_APIKEY_SECRET'),
); */

xdescribe('MailjetController', () => {
  let controller: MailjetController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule, CqrsModule],
      controllers: [MailjetController],
      providers: [MailjetService],
    }).compile();

    controller = module.get<MailjetController>(MailjetController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
