import { Test, TestingModule } from '@nestjs/testing';
import { UserRefferencedController } from './user_refferenced.controller';
import { UserRefferencedService } from './user_refferenced.service';

describe('UserRefferencedController', () => {
  let controller: UserRefferencedController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserRefferencedController],
      providers: [UserRefferencedService],
    }).compile();

    controller = module.get<UserRefferencedController>(UserRefferencedController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
