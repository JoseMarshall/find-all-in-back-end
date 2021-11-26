import { Common, TimeStamps, User, UserRoles } from '../../../../constants';
import { GetAll } from '../sub-types';

export interface GetAllUsers extends GetAll {
  [User.Email]?: string;
  [User.Role]?: string;
  [TimeStamps.UpdatedAt]?: string;
}

export interface GetOneUser {
  [Common.Id]: string;
}

export interface UpdateUser {
  params: { id: string };
  body: {
    [User.Name]?: string;
    [User.Photo]?: string;
    [User.Role]?: `${UserRoles}`;
  };
}
