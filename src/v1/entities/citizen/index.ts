import { v4 as uuid } from 'uuid';

import { Citizen, Common, TimeStamps } from '../../../constants';
import { ICitizenInput } from './citizen.types';

// eslint-disable-next-line import/prefer-default-export
export const makeCitizen = (
  data: Pick<ICitizenInput, Citizen.Name> & { [Citizen.UserAccount]: string },
  id?: string
) => ({
  [Common.Id]: id ?? uuid(),
  ...data,
  [Common.IsDeleted]: false,
  [TimeStamps.CreatedAt]: new Date(),
  [TimeStamps.UpdatedAt]: new Date(),
});
