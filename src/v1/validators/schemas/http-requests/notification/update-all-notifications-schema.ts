import joi from 'joi';

import joiValidator from '../../../index';
import { UpdateAllNotifications } from '../../../types/notification';

export const updateAllNotificationsSchema = joi
  .object({
    body: joi
      .object({
        isRead: joi.boolean(),
        isDeleted: joi.boolean().valid(true),
      })
      .required()
      .unknown(false),
    params: joi.object({}).required().unknown(false),
  })
  .required()
  .unknown(true);

export default joiValidator<UpdateAllNotifications>(updateAllNotificationsSchema);
