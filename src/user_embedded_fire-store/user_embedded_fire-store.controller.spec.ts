import { Test, TestingModule } from '@nestjs/testing';
import { UserEmbeddedFireStoreController } from './user_embedded_fire-store.controller';
import { UserEmbeddedFireStoreService } from './user_embedded_fire-store.service';

describe('UserEmbeddedFireStoreController', () => {
  let controller: UserEmbeddedFireStoreController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserEmbeddedFireStoreController],
      providers: [UserEmbeddedFireStoreService],
    }).compile();

    controller = module.get<UserEmbeddedFireStoreController>(UserEmbeddedFireStoreController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
