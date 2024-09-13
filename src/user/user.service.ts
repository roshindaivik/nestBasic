import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './user.validator';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll() {
    return await this.usersRepository.find();
  }

  async create(createUserDto: CreateUserDto) {
    const email = createUserDto.email;
    let user = await this.usersRepository.findOne({
      where: { email },
    });
    if (user) {
      throw new ConflictException(`User with Email "${email}" already Exists`);
    }
    user = this.usersRepository.create({
      ...createUserDto,
    });
    return this.usersRepository.save(user);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { email } });
  }
}
