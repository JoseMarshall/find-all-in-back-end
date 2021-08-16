import joi from 'joi';

import { TimeStamps, User, UserRoles } from '../../../../../constants';
import { dateRangeRegex } from '../../../../utils/regex';
import joiValidator from '../../../index';
import { GetAllUsers } from '../../../types/user';
import { getAllSchema } from '../sub-schemas';

const getAllUserSchema = joi
  .object(getAllSchema)
  .append({
    [User.Email]: joi.string().email(),
    [User.Role]: joi.string().valid(...Object.values(UserRoles)),
    [TimeStamps.UpdatedAt]: joi.string().pattern(dateRangeRegex),
  })
  .required()
  .unknown(false);

export default joiValidator<GetAllUsers>(getAllUserSchema);
