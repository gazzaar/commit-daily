import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CreateUserDto } from './dto/CreateUser.dto';
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
  async getUser(@Param('id') id: string): Promise<UserDto> {
    return await this.userService.getUser(id);
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }
}
