import joi from 'joi';

import { User, UserRoles } from '../../../../../constants';
import joiValidator from '../../../index';
import { UpdateUser } from '../../../types/user';
import { idSchema } from '../sub-schemas';

export const updateOneUserSchema = joi
  .object({
    body: joi
      .object({
        [User.Name]: joi.string(),
        [User.Photo]: joi.string().uri(),
        [User.Role]: joi.string().valid(...Object.values(UserRoles)),
      })
      .min(1)
      .required()
      .unknown(false),
    params: joi.object(idSchema).required().unknown(false),
  })
  .required()
  .unknown(true);

export default joiValidator<UpdateUser>(updateOneUserSchema);
