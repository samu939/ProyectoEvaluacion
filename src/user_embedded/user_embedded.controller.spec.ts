import { Test, TestingModule } from '@nestjs/testing';
import { UserEmbeddedController } from './user_embedded.controller';
import { UserEmbeddedService } from './user_embedded.service';

describe('UserEmbeddedController', () => {
  let controller: UserEmbeddedController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserEmbeddedController],
      providers: [UserEmbeddedService],
    }).compile();

    controller = module.get<UserEmbeddedController>(UserEmbeddedController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
