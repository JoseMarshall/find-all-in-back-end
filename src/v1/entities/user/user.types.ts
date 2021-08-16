import { User, UserRoles } from '../../../constants';
import { Entity } from '../entity.types';

export interface IUser extends Entity {
  [User.Name]: string;
  [User.Email]: string;
  [User.Role]: `${UserRoles}`;
  [User.Username]: string;
  [User.Password]: string;
}

export type IUserInput = Omit<IUser, keyof Entity>;
