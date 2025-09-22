import { Request } from 'express';
import { User } from 'src/users/interfaces/user.interface';

export interface requestUser extends Request {
  user: Pick<User, 'email' | 'password'>;
}
