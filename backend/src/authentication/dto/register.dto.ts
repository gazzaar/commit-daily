import { IsString, IsNotEmpty, MinLength, IsEmail } from 'class-validator';
export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  fullName: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(7)
  password: string;
}
