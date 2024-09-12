import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  async findAll() {
    return { success: true, msg: 'FindAll' };
  }

  create() {
    return { success: true, msg: 'Create User' };
  }
}
