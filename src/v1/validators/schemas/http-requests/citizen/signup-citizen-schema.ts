import joi from 'joi';

import { Citizen, User } from '../../../../../constants';
import { ICitizenInput } from '../../../../entities/citizen/citizen.types';
import joiValidator from '../../../index';

const signupCitizenSchema = joi
  .object({
    [Citizen.Name]: joi.string().required(),
    [User.Email]: joi.string().email().required(),
    [User.Photo]: joi.string().uri().optional(),
    [User.Username]: joi.string().required(),
    [User.Password]: joi.string().required(),
  })
  .required()
  .unknown(false);

export default joiValidator<ICitizenInput>(signupCitizenSchema);
