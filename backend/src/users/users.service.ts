import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import crypto from 'node:crypto';
import { plainToInstance } from 'class-transformer';
import { UserDto } from './dto/User.dto';
import { UserNotFoundException } from './exceptions/userNotFound.exception';

@Injectable()
export default class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async getUsers(): Promise<UserDto[] | undefined> {
    const users = await this.prismaService.user.findMany();
    return plainToInstance(UserDto, users, {
      excludeExtraneousValues: true,
    });
  }

  async getUserById(id: string): Promise<UserDto> {
    const user = this.prismaService.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new UserNotFoundException(id);
    }

    return plainToInstance(UserDto, user, {
      excludeExtraneousValues: true,
    });
  }

  async getUserByEmail(email: string): Promise<UserDto> {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new HttpException(
        `User with email ${email} does not exist`,
        HttpStatus.NOT_FOUND,
      );
    }

    return plainToInstance(UserDto, user, {
      excludeExtraneousValues: true,
    });
  }

  async createUser(createUserDto: CreateUserDto) {
    const user = {
      ...createUserDto,
      createdAt: new Date(),
      id: crypto.randomUUID(),
      updatedAt: new Date(),
    };

    const newUser = await this.prismaService.user.create({
      data: user,
    });
    return plainToInstance(UserDto, newUser, {
      excludeExtraneousValues: true,
    });
  }
}
