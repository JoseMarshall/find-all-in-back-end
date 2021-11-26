import joi from 'joi';

import { Comment } from '../../../../../constants';
import joiValidator from '../../../index';
import { GetAllComments } from '../../../types/comment';
import { getAllSchema } from '../sub-schemas';

const getAllCommentsSchema = joi
  .object(getAllSchema)
  .append({
    [Comment.MissingPoster]: joi.string().uuid({ version: 'uuidv4' }),
    [Comment.PostedBy]: joi.string().uuid({ version: 'uuidv4' }),
  })
  .required()
  .unknown(false);

export default joiValidator<GetAllComments>(getAllCommentsSchema);
