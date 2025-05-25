import { Test, TestingModule } from '@nestjs/testing';
import { ReferencedUserFireStoreController } from './referenced_user_fire-store.controller';
import { ReferencedUserFireStoreService } from './referenced_user_fire-store.service';

describe('ReferencedUserFireStoreController', () => {
  let controller: ReferencedUserFireStoreController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReferencedUserFireStoreController],
      providers: [ReferencedUserFireStoreService],
    }).compile();

    controller = module.get<ReferencedUserFireStoreController>(ReferencedUserFireStoreController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
