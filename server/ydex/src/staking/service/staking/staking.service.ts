import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  CreatePairPoolDto,
  CreateSinglePoolDto,
} from 'src/staking/dto/staking.dto';
import { PairPool } from 'src/staking/model/PairPool.model';
import { StakedToken } from 'src/staking/model/StakedToken.model';
import { Token } from 'src/staking/model/Token.model';

@Injectable()
export class StakingService {
  private logger = new Logger('StakingController');
  constructor(
    @InjectModel('PairPool') private readonly pairPoolModel: Model<PairPool>,
    @InjectModel('StakedToken')
    private readonly stakedTokenModel: Model<StakedToken>,
    @InjectModel('Token') private readonly tokenModel: Model<Token>,
  ) {}
  

  async getPairPool(): Promise<PairPool[]> {
    try {
      const pairPoolList = await this.pairPoolModel.find();

      if (!pairPoolList)
        throw new NotFoundException('Cannot find any PairPool List');

      return pairPoolList;
    } catch (error) {
      throw new BadRequestException('Cannot execute request');
    }
  }

  async getSinlePool(): Promise<StakedToken[]> {
    try {
      const singlePoolList = await this.stakedTokenModel.find();

      if (!singlePoolList)
        throw new NotFoundException('Cannot find any SinglePool List');

      return singlePoolList;
    } catch (error) {
      throw new BadRequestException('Cannot execute request');
    }
  }


  async createPairPool(createPairPoolDto: CreatePairPoolDto): Promise<{}> {
    try {
      const newPairPool = await this.pairPoolModel.create(createPairPoolDto);
      const savedPairPool = await newPairPool.save();
      return savedPairPool;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException('Cannot execute request');
    }
  }

  async createSinglePool(
    createSinglePoolDto: CreateSinglePoolDto,
  ): Promise<{}> {
    try {
      const newSinglePool = await this.stakedTokenModel.create(
        createSinglePoolDto,
      );
      const savedSinglePool = await newSinglePool.save();
      return savedSinglePool;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException('Cannot execute request');
    }
  }

  singleStaking() {}

  klayStaking() {}

  kip7Staking() {}
}
