import { Expose, Transform, Exclude } from 'class-transformer';
export class UserDto {
  @Expose()
  id: string;

  @Expose()
  fullName: string;

  @Expose()
  email: string;

  @Expose()
  password: string;

  @Expose()
  @Transform(({ value }) => value.getTime())
  createdAt: number;

  @Expose()
  @Transform(({ value }) => value.getTime())
  updatedAt: number;
}
