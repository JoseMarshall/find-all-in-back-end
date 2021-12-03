import joi from 'joi';

import { Employee, User } from '../../../../../constants';
import { IEmployeeInput } from '../../../../entities/employee/employee.types';
import joiValidator from '../../../index';

const createEmployeeSchema = joi
  .object({
    [Employee.Name]: joi.string().required(),
    [Employee.Role]: joi.string().required(),
    [Employee.IdentificationNumber]: joi.string().required(),
    [User.Email]: joi.string().email().required(),
    [User.Photo]: joi.string().uri().optional(),
    [User.Username]: joi.string().required(),
    [User.Password]: joi.string().required(),
  })
  .required()
  .unknown(false);

export default joiValidator<IEmployeeInput>(createEmployeeSchema);
