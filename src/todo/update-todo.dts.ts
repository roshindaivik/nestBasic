import { IsString, IsEnum, IsOptional } from 'class-validator';

export enum TodoStatus {
  PENDING = 'pending',
  ACTIVE = 'active',
  DONE = 'done',
}

export class UpdateTodoDTO {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEnum(TodoStatus)
  status?: TodoStatus;
}
