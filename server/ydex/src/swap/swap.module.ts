import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SwapController } from './controller/swap/swap.controller';
import { SwapService } from './service/swap/swap.service';

@Module({
  controllers: [SwapController],
  providers: [SwapService],
})
export class SwapModule {}
