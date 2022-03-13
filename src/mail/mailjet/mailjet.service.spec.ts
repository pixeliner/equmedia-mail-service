import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

import { MailjetService } from './mailjet.service';

describe('MailjetService', () => {
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
