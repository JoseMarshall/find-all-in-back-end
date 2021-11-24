import joi from 'joi';

import { MissingPoster } from '../../../../../constants';
import joiValidator from '../../../index';
import { UpdateLikesPoster } from '../../../types/missing-poster';
import { idSchema } from '../sub-schemas';

const likeMissingPosterSchema = joi
  .object({
    body: joi
      .alternatives(
        {
          [MissingPoster.Likes]: joi.number().valid(1).required(),
          [MissingPoster.Dislikes]: joi.number().valid(-1).required(),
        },
        {
          [MissingPoster.Likes]: joi.number().valid(-1).required(),
          [MissingPoster.Dislikes]: joi.number().valid(1).required(),
        },
        {
          [MissingPoster.Likes]: joi.number().valid(1).required(),
        },
        {
          [MissingPoster.Dislikes]: joi.number().valid(1).required(),
        },
        {
          [MissingPoster.Likes]: joi.number().valid(-1).required(),
        },
        {
          [MissingPoster.Dislikes]: joi.number().valid(-1).required(),
        }
      )
      .required(),
    params: joi.object(idSchema).required().unknown(false),
  })
  .required()
  .unknown(true);

export default joiValidator<UpdateLikesPoster>(likeMissingPosterSchema);
