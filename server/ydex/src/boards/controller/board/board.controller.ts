import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateBoardDto } from 'src/boards/dto/board/board.dto';
import { BoardService } from 'src/boards/service/board/board.service';

@Controller('board')
export class BoardController {

    constructor(private readonly boardService:BoardService){}

    @Post()
    createBoard(@Body() createBoardDto:CreateBoardDto){
        return this.boardService.createBoard(createBoardDto)
    }

    @Get()
    getBoard(){
        return this.boardService.getBoard();
    }
}
