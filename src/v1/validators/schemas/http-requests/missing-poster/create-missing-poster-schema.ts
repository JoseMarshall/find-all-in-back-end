import joi from 'joi';

import { MissingPoster, MissingPosterStatus } from '../../../../../constants';
import { IMissingPosterInput } from '../../../../entities/missing-poster/missing-poster.types';
import joiValidator from '../../../index';
import { addressSchema } from '../sub-schemas';

const createMissingPosterSchema = joi
  .object({
    [MissingPoster.Name]: joi.string().required(),
    [MissingPoster.LastSeenAt]: joi.string().required(),
    [MissingPoster.LastSeenDate]: joi.date().required(),
    [MissingPoster.Photo]: joi.string().uri().required(),
    [MissingPoster.Feedback]: joi.string().allow(''),
    [MissingPoster.DisappearanceParticipation]: joi.string().uri(),
    [MissingPoster.CreatedBy]: joi.string().uuid().required(),
    [MissingPoster.Address]: addressSchema,
    [MissingPoster.Status]: joi
      .string()
      .valid(...Object.values(MissingPosterStatus))
      .required(),
  })
  .required()
  .unknown(false);

export default joiValidator<IMissingPosterInput>(createMissingPosterSchema);
