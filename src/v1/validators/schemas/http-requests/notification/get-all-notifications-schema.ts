import joi from 'joi';

import { TimeStamps } from '../../../../../constants';
import { dateRangeRegex } from '../../../../../utils/regex';
import joiValidator from '../../../index';
import { GetAllNotifications } from '../../../types/notification';
import { getAllSchema } from '../sub-schemas';

const getAllNotificationSchema = joi
  .object(getAllSchema)
  .append({
    [TimeStamps.UpdatedAt]: joi.string().pattern(dateRangeRegex),
  })
  .required()
  .unknown(false);

export default joiValidator<GetAllNotifications>(getAllNotificationSchema);
