import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BoardsModule } from './boards/boards.module';
import { SwapModule } from './swap/swap.module';
import { StakingModule } from './staking/staking.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { NftMarketModule } from './nft_market/nft_market.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ['.env'], isGlobal: true }),
    MongooseModule.forRoot(
      process.env.MONGO_URL,
    ),
    BoardsModule,
    SwapModule,
    StakingModule,
    DashboardModule,
    NftMarketModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
