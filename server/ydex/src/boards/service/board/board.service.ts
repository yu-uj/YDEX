import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBoardDto } from 'src/boards/dto/board/board.dto';
import { Board } from 'src/boards/model/board/board.model';

@Injectable()
export class BoardService {
  constructor(@InjectModel('Board') private readonly boardModel:Model<Board>) {}

  async createBoard(createBoardDto:CreateBoardDto){
    const newBoard = new this.boardModel(createBoardDto)
    const savedBoard = await newBoard.save();
    return savedBoard;
  }

  getBoard(){
    const boards = this.boardModel.find();
    return boards;
  }
}
