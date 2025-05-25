import { Test, TestingModule } from '@nestjs/testing';
import { UserRefferencedService } from './user_refferenced.service';

describe('UserRefferencedService', () => {
  let service: UserRefferencedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserRefferencedService],
    }).compile();

    service = module.get<UserRefferencedService>(UserRefferencedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
