import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './user.validator';
import { plainToClass } from 'class-transformer';
import { UserResponseDto } from './user-response.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
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

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return plainToClass(UserResponseDto, req.user);
  }
}
