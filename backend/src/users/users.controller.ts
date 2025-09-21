import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import CreateUserDto from './dto/createUser.dto';
import UsersService from './users.service';

@Controller('users')
export default class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.userService.getUser(id);
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    this.userService.createUser(createUserDto);
  }
}
