import { IsString, MinLength, MaxLength, IsEnum } from 'class-validator';

export enum TodoStatus {
  PENDING = 'pending',
  ACTIVE = 'active',
  DONE = 'done',
}

export class CreateTodoDTO {
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  name: string;

  @IsEnum(TodoStatus)
  status: TodoStatus;
}
