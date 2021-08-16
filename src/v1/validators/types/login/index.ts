import { User } from '../../../../constants';

export type ILogin =
  | {
      [User.Email]?: never;
      [User.Username]: string;
      [User.Password]: string;
    }
  | {
      [User.Email]: string;
      [User.Username]?: never;
      [User.Password]: string;
    };
