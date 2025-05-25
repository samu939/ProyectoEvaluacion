import { Test, TestingModule } from '@nestjs/testing';
import { ReferencedUserFireStoreService } from './referenced_user_fire-store.service';

describe('ReferencedUserFireStoreService', () => {
  let service: ReferencedUserFireStoreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReferencedUserFireStoreService],
    }).compile();

    service = module.get<ReferencedUserFireStoreService>(ReferencedUserFireStoreService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
