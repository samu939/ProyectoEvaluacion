import { Test, TestingModule } from '@nestjs/testing';
import { UserEmbeddedService } from './user_embedded.service';

describe('UserEmbeddedService', () => {
  let service: UserEmbeddedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserEmbeddedService],
    }).compile();

    service = module.get<UserEmbeddedService>(UserEmbeddedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
