import { IsString, IsNotEmpty, MinLength, IsOptional } from 'class-validator';
export class CreateHabitDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  habitName: string;

  @IsString()
  @IsOptional()
  @MinLength(3)
  description?: string | null;
}
