import { AuthenticationService } from './authentication.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import UsersService from '../users/users.service';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

const email = 'john@smith.com';

describe('The AuthenticationService', () => {
  let authenticationService: AuthenticationService;
  let password: string;
  let getByEmailMock: jest.Mock;
  beforeEach(async () => {
    getByEmailMock = jest.fn();
    const module = await Test.createTestingModule({
      providers: [
        AuthenticationService,
        {
          provide: UsersService,
          useValue: {
            getByEmail: getByEmailMock,
          },
        },
      ],
      imports: [
        ConfigModule.forRoot(),
        JwtModule.register({
          secretOrPrivateKey: 'Secret key',
        }),
      ],
    }).compile();

    authenticationService = await module.get(AuthenticationService);
  });
  describe('when calling the getCookieForLogOut method', () => {
    it('should return a correct string', () => {
      const result = authenticationService.getCookieForLogOut();
      expect(result).toBe('Authentication=; HttpOnly; Path=/; Max-Age=0');
    });
  });
  describe('when the getAuthenticatedUser method is called', () => {
    describe('and a valid email and password are provided', () => {
      let userData: User;
      beforeEach(async () => {
        password = 'strongPassword123';
        const hashedPassword = await bcrypt.hash(password, 10);
        userData = {
          id: randomUUID(),
          email: email,
          fullName: 'John',
          password: hashedPassword,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        getByEmailMock.mockResolvedValue(userData);
      });
      it('should return the new user', async () => {
        const result = await authenticationService.getAuthenticatedUser(
          userData.email,
          password,
        );
        expect(result).toBe({ ...userData, password: undefined });
      });
    });
    describe('and an invalid email is provided', () => {
      beforeEach(() => {
        getByEmailMock.mockRejectedValue(
          new HttpException(
            `User with email ${email} does not exist`,
            HttpStatus.NOT_FOUND,
          ),
        );
      });
      it('should throw the BadRequestException', () => {
        return expect(async () => {
          await authenticationService.getAuthenticatedUser(
            'john@smith.com',
            password,
          );
        }).rejects.toThrow(HttpException);
      });
    });
  });
});
