import { Common, TimeStamps, User } from '../../../../constants';
import { GetAll } from '../sub-types';

export interface GetAllUsers extends GetAll {
  [User.Email]?: string;
  [User.Role]?: string;
  [TimeStamps.UpdatedAt]?: string;
}

export interface GetOneUser {
  [Common.Id]: string;
}
