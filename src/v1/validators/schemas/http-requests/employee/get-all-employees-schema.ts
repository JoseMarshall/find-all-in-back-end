import joi from 'joi';

import { Employee } from '../../../../../constants';
import joiValidator from '../../../index';
import { GetAllEmployees } from '../../../types/employee';
import { getAllSchema } from '../sub-schemas';

const getAllEmployeesSchema = joi
  .object(getAllSchema)
  .append({
    [Employee.Name]: joi.string(),
  })
  .required()
  .unknown(false);

export default joiValidator<GetAllEmployees>(getAllEmployeesSchema);
