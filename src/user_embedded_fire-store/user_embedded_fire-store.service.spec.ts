import { Test, TestingModule } from '@nestjs/testing';
import { UserEmbeddedFireStoreService } from './user_embedded_fire-store.service';

describe('UserEmbeddedFireStoreService', () => {
  let service: UserEmbeddedFireStoreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserEmbeddedFireStoreService],
    }).compile();

    service = module.get<UserEmbeddedFireStoreService>(UserEmbeddedFireStoreService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
