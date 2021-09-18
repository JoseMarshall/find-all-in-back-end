import joi from 'joi';

import { MissingPoster } from '../../../../../constants';
import { IMissingPosterInput } from '../../../../entities/missing-poster/missing-poster.types';
import joiValidator from '../../../index';
import { addressSchema } from '../sub-schemas';

const createMissingPosterSchema = joi
  .object({
    [MissingPoster.Name]: joi.string().required(),
    [MissingPoster.LastSeenAt]: joi.string().required(),
    [MissingPoster.LastSeenDate]: joi.date().required(),
    [MissingPoster.Photo]: joi.string().uri(),
    [MissingPoster.CreatedBy]: joi.string().uuid(),
    [MissingPoster.Address]: addressSchema,
  })
  .required()
  .unknown(false);

export default joiValidator<IMissingPosterInput>(createMissingPosterSchema);
