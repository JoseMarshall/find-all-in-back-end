import joi from 'joi';

import joiValidator from '../../../index';
import { UpdateManyNotifications } from '../../../types/notification';

export const updateManyNotificationsSchema = joi
  .object({
    body: joi
      .object({
        isRead: joi.boolean(),
        isDeleted: joi.boolean().valid(true),
        notifications: joi.array().items(joi.string().uuid()).required(),
      })
      .required()
      .unknown(false),
    params: joi.object({}).required().unknown(false),
  })
  .required()
  .unknown(true);

export default joiValidator<UpdateManyNotifications>(updateManyNotificationsSchema);
