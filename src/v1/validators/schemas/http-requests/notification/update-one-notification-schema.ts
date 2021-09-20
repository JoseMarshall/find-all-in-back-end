import joi from 'joi';

import joiValidator from '../../../index';
import { UpdateOneNotification } from '../../../types/notification';
import { idSchema } from '../sub-schemas';

export const updateOneNotificationSchema = joi
  .object({
    body: joi
      .object({
        isRead: joi.boolean(),
        isDeleted: joi.boolean().valid(true),
      })
      .required()
      .unknown(false),
    params: joi.object({}).append(idSchema).required().unknown(false),
  })
  .required()
  .unknown(true);

export default joiValidator<UpdateOneNotification>(updateOneNotificationSchema);
