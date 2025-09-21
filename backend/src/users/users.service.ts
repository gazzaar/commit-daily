import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import CreateUserDto from './dto/createUser.dto';
import { User } from './interfaces/user.interface';
import crypto from 'node:crypto';

@Injectable()
export default class UsersService {
  private users: User[] = [];

  getUsers() {
    return this.users;
  }

  getUser(id: string) {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  createUser(createUserDto: CreateUserDto) {
    const user = {
      ...createUserDto,
      createdAt: Date.now(),
      id: crypto.randomUUID(),
    };
    this.users.push(user);
  }
}
