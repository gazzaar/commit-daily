import { IsString, IsNotEmpty, IsEmail } from 'class-validator';
export class LogInDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
