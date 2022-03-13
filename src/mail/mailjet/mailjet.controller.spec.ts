import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

import { MailjetController } from './mailjet.controller';
import { MailjetService } from './mailjet.service';

describe('MailjetController', () => {
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
