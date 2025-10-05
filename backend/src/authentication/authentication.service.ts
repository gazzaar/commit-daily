import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import UsersService from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import bcrypt from 'bcrypt';
import PostgresErrorCode from '../prisma/postgresErrorCode.enum';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from './interfaces/tokenPayload.interface';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  public getCookieWithJwtToken(userId: string) {
    const payload: TokenPayload = { userId };
    const token = this.jwtService.sign(payload);
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get('JWT_EXPIRATION_TIME')}`;
  }

  public getCookieForLogOut() {
    return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
  }

  public async register(registerationData: RegisterDto) {
    const hashedPassword = await bcrypt.hash(registerationData.password, 10);
    try {
      const createUser = await this.userService.createUser({
        ...registerationData,
        password: hashedPassword,
      });

      const user = {
        ...createUser,
        password: undefined,
      };
      return user;
    } catch (error) {
      if (
        error?.code === PostgresErrorCode.UniqueViolation ||
        error?.code === 'P2002'
      ) {
        throw new HttpException(
          'User with that email already exists',
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async getAuthenticatedUser(email: string, plainTextPassword: string) {
    try {
      const user = await this.userService.getUserByEmail(email);

      await this.verifyPasswords(plainTextPassword, user.password);

      return {
        ...user,
        password: undefined,
      };
    } catch (error) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private async verifyPasswords(
    plainTextPassword: string,
    hashedPassword: string,
  ) {
    const isPasswordMatching = await bcrypt.compare(
      plainTextPassword,
      hashedPassword,
    );
    if (!isPasswordMatching) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
