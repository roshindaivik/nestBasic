import { Injectable } from '@nestjs/common';
import { Todo } from './todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/user.entity';
import { CreateTodoDTO } from './create-todo.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
  ) {}

  async createTodo(user: User, createTodoDTO: CreateTodoDTO) {
    const todo = this.todoRepository.create({
      ...createTodoDTO,
      user,
    });
    return this.todoRepository.save(todo);
  }
}
