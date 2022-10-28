import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StakingController } from './controller/staking/staking.controller';
import { PairPoolSchema } from './model/PairPool.model';
import { StakedTokenSchema } from './model/StakedToken.model';
import { TokenSchema } from './model/Token.model';
import { StakingService } from './service/staking/staking.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'PairPool', schema: PairPoolSchema },
      { name: 'StakedToken', schema: StakedTokenSchema },
      { name: 'Token', schema: TokenSchema },
    ]),
  ],
  controllers: [StakingController],
  providers: [StakingService]
})
export class StakingModule {}
