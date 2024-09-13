import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/user.entity';
import { CreateTodoDTO } from './create-todo.dto';
import { UpdateTodoDTO } from './update-todo.dts';
import { RediscacheService } from 'src/rediscache/rediscache.service';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
    private redisCacheService: RediscacheService,
  ) {}

  async createTodo(user: User, createTodoDTO: CreateTodoDTO) {
    const todo = this.todoRepository.create({
      ...createTodoDTO,
      user,
    });
    return this.todoRepository.save(todo);
  }

  async fetchTodos(user: User) {
    const userId = user.id;
    const redisKey = `todos:${userId}`;
    const cacheResult = await this.redisCacheService.get(redisKey);
    if (cacheResult) {
      return JSON.parse(cacheResult);
    }
    const todos = await this.todoRepository
      .createQueryBuilder('todo')
      .innerJoinAndSelect('todo.user', 'user')
      .where('user.id = :userId', { userId })
      .getMany();

    await this.redisCacheService.set(redisKey, JSON.stringify(todos));
    return todos;
  }

  async replaceTodo(
    user: User,
    id: number,
    updateTodoDTO: UpdateTodoDTO,
  ): Promise<Todo> {
    const todo = await this.todoRepository.findOne({
      where: { id, user: { id: user.id } },
    });
    if (!todo) {
      throw new NotFoundException(`Todo with ID "${id}" not found`);
    }
    Object.assign(todo, updateTodoDTO);
    return this.todoRepository.save(todo);
  }
}
