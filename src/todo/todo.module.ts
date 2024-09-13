import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './todo.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([Todo])],
  controllers: [TodoController],
  providers: [TodoService],
  exports: [TodoService],
})
export class TodoModule {}
