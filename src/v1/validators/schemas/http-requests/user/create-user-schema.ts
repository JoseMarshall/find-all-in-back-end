import joi from 'joi';

import { User, UserRoles } from '../../../../../constants';
import { IUserInput } from '../../../../entities/user/user.types';
import joiValidator from '../../../index';

const createCashFlowSchema = joi
  .object({
    [User.Name]: joi.string().required(),
    [User.Email]: joi.string().email().required(),
    [User.Username]: joi.string().required(),
    [User.Password]: joi.string().required(),
    [User.Role]: joi.required().valid(UserRoles.FindAllInAdmin),
  })
  .required()
  .unknown(false);

export default joiValidator<IUserInput>(createCashFlowSchema);
