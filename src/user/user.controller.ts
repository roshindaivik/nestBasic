import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './user.validator';
import { plainToClass } from 'class-transformer';
import { UserResponseDto } from './user-response.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll() {
    const users = this.userService.findAll();
    const usersResponse = plainToClass(UserResponseDto, users);
    return usersResponse;
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    const user = this.userService.create(createUserDto);
    const userResponse = plainToClass(UserResponseDto, user);
    return userResponse;
  }
}
