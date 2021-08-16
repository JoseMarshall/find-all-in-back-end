import joi from 'joi';

import { User } from '../../../../../constants';
import joiValidator from '../../../index';
import { ILogin } from '../../../types/login';

const loginSchema = joi
  .object({
    [User.Email]: joi.string().email().required(),
    [User.Username]: joi.string().required(),
    [User.Password]: joi.string().required(),
  })
  .when(joi.object({ [User.Email]: joi.exist() }).unknown(true), {
    then: joi.object({
      [User.Username]: joi.forbidden(),
    }),
    otherwise: joi.object({
      [User.Username]: joi.string().required(),
    }),
  })
  .required()
  .unknown(false);

export default joiValidator<ILogin>(loginSchema);
