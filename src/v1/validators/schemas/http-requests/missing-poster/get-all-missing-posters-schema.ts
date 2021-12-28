import joi from 'joi';

import { MissingPoster } from '../../../../../constants';
import { dateRangeRegex } from '../../../../../utils/regex';
import joiValidator from '../../../index';
import { GetAllMissingPosters } from '../../../types/missing-poster';
import { getAllSchema } from '../sub-schemas';

const getAllMissingPosterSchema = joi
  .object(getAllSchema)
  .append({
    [MissingPoster.Name]: joi.string(),
    [MissingPoster.LastSeenDate]: joi.string().pattern(dateRangeRegex),
    [MissingPoster.CreatedBy]: joi.string().uuid(),
    [MissingPoster.ApprovalStatus]: joi
      .string()
      .pattern(/^(pending\||approved\||denied\|)*(pending|approved|denied){1}$/),
    [MissingPoster.Status]: joi
      .string()
      .pattern(/^(seen\||missing\||found\|)*(seen|missing|found){1}$/),
  })
  .required()
  .unknown(false);

export default joiValidator<GetAllMissingPosters>(getAllMissingPosterSchema);
