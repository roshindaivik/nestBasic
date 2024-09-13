import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDTO } from './create-todo.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { plainToClass } from 'class-transformer';
import { TodoResponseDTO } from './todo-response.dto';
import { UpdateTodoDTO } from './update-todo.dts';

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

  @UseGuards(AuthGuard)
  @Get()
  async fetchTodos(@Req() req) {
    try {
      const todos = await this.todoService.fetchTodos(req.user);
      const todosResponse = plainToClass(TodoResponseDTO, todos);
      return todosResponse;
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException('Internal Server Error');
    }
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  async updateTodo(
    @Req() req,
    @Param('id') id: number,
    @Body() updateTodoDTO: UpdateTodoDTO,
  ) {
    try {
      const updatedTodo = await this.todoService.replaceTodo(
        req.user,
        id,
        updateTodoDTO,
      );
      return plainToClass(TodoResponseDTO, updatedTodo);
    } catch (error) {
      console.log(error);
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new InternalServerErrorException('Failed to update todo');
    }
  }
}
