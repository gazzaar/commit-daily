import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import UsersService from './users.service';
import { UserDto } from './dto/User.dto';

@Controller('users')
export default class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  async getUsers(): Promise<UserDto[] | undefined> {
    return await this.userService.getUsers();
  }

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<UserDto> {
    return await this.userService.getUserById(id);
  }
}
