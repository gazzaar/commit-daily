import {
  Body,
  Controller,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { RegisterDto } from './dto/register.dto';
import { LocalAuthenticationGuard } from './localAuthentication.guard';
import type { requestUser } from './interfaces/requestUser.interface';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('register')
  async register(@Body() registerationData: RegisterDto) {
    return this.authenticationService.register(registerationData);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post('log-in')
  async login(@Req() request: requestUser) {
    const user = request.user;

    return {
      ...user,
      password: undefined,
    };
  }
}
