import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  async findAll() {
    return { success: true, msg: 'FindAll' };
  }

  create() {
    const user = {
      id: 1,
      username: 'john',
      email: 'john@example.com',
    };
    return user;
  }
}
