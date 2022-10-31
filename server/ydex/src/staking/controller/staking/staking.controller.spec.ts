import { Test, TestingModule } from '@nestjs/testing';
import { StakingController } from './staking.controller';

describe('StakingController', () => {
  let controller: StakingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StakingController],
    }).compile();

    controller = module.get<StakingController>(StakingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
