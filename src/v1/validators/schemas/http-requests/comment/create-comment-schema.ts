import joi from 'joi';

import { Comment } from '../../../../../constants';
import { ICommentInput } from '../../../../entities/comment/comment.types';
import joiValidator from '../../../index';

const createCommentSchema = joi
  .object({
    [Comment.MissingPoster]: joi.string().uuid({ version: 'uuidv4' }).required(),
    [Comment.PostedBy]: joi.string().uuid({ version: 'uuidv4' }).required(),
    [Comment.Text]: joi.string().required(),
  })
  .required()
  .unknown(false);

export default joiValidator<ICommentInput>(createCommentSchema);
