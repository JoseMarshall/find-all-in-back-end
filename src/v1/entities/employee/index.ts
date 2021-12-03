import { v4 as uuid } from 'uuid';

import { Common, Employee, TimeStamps } from '../../../constants';
import { IEmployeeInput } from './employee.types';

// eslint-disable-next-line import/prefer-default-export
export const makeEmployee = (
  data: Pick<IEmployeeInput, Employee.Name | Employee.Role | Employee.IdentificationNumber> & {
    [Employee.UserAccount]: string;
  },
  id?: string
) => ({
  [Common.Id]: id ?? uuid(),
  ...data,
  [Common.IsDeleted]: false,
  [TimeStamps.CreatedAt]: new Date(),
  [TimeStamps.UpdatedAt]: new Date(),
});
