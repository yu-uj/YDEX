import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BoardController } from './controller/board/board.controller';
import { BoardSchema } from './model/board/board.model';
import { BoardService } from './service/board/board.service';


@Module({
  imports : [MongooseModule.forFeature([{name : 'Board', schema:BoardSchema}])],
  controllers: [BoardController],
  providers: [BoardService]
})
export class BoardsModule {}
