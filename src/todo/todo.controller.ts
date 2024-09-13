import {
  Body,
  Controller,
  InternalServerErrorException,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDTO } from './create-todo.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { plainToClass } from 'class-transformer';
import { TodoResponseDTO } from './todo-response.dto';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @UseGuards(AuthGuard)
  @Post()
  async createTodo(@Req() req, @Body() createTodoDTO: CreateTodoDTO) {
    try {
      const todo = await this.todoService.createTodo(req.user, createTodoDTO);
      const todoRespomse = plainToClass(TodoResponseDTO, todo);
      return todoRespomse;
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException('Internal Server Error');
    }
  }
}
