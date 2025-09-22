import { Request } from 'express';
import { User } from 'src/users/interfaces/user.interface';

type SafeUser = Omit<User, 'password'>;
export interface RequestUser extends Request {
  user: SafeUser;
}
