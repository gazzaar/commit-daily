import {
  Body,
  Controller,
  HttpCode,
  Post,
  Req,
  UseGuards,
  Res,
  Get,
} from '@nestjs/common';

import type { Response } from 'express';
import { AuthenticationService } from './authentication.service';
import { RegisterDto } from './dto/register.dto';
import { LocalAuthenticationGuard } from './localAuthentication.guard';
import type { RequestUser } from './interfaces/requestUser.interface';
import JwtAuthenticationGuard from './jwt-authentication.guard';
import { LogInDto } from './dto/logIn.dto';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @UseGuards(JwtAuthenticationGuard)
  @Get()
  authenticate(@Req() request: RequestUser) {
    const user = request.user;
    return {
      ...user,
      password: undefined,
    };
  }

  @Post('register')
  async register(@Body() registerationData: RegisterDto) {
    return this.authenticationService.register(registerationData);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post('log-in')
  async login(
    @Body() logInDto: LogInDto,
    @Req() request: RequestUser,
    @Res() response: Response,
  ) {
    const user = request.user;
    const cookie = this.authenticationService.getCookieWithJwtToken(user.id);
    response.setHeader('Set-Cookie', cookie);

    return response.send({
      ...user,
      password: undefined,
    });
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post('log-out')
  async logOut(@Req() request: RequestUser, @Res() response: Response) {
    response.setHeader(
      'Set-Cookie',
      this.authenticationService.getCookieForLogOut(),
    );
    return response.sendStatus(200);
  }
}
