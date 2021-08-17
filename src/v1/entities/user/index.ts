import { v4 as uuid } from 'uuid';

import { Common, TimeStamps } from '../../../constants';
import { IUserInput } from './user.types';

// eslint-disable-next-line import/prefer-default-export
export const makeUser = (data: IUserInput, id?: string) => ({
  [Common.Id]: id ?? uuid(),
  ...data,
  [Common.IsDeleted]: false,
  [TimeStamps.CreatedAt]: new Date(),
  [TimeStamps.UpdatedAt]: new Date(),
});
