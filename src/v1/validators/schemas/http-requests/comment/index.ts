import { Comment, ServerConstants } from '../../../../../constants';
import { ExpressRequestSession, HttpRequest } from '../../../../../main/adapters/adapters.types';
import createCommentSchemaValidator from './create-comment-schema';
import getAllCommentsSchemaValidator from './get-all-comments-schema';

// eslint-disable-next-line import/prefer-default-export
export const makeCreateCommentValidator = () => async (req: ExpressRequestSession) =>
  createCommentSchemaValidator({
    ...req.body,
    [Comment.PostedBy]: req[ServerConstants.Session].user.id,
  });

export const makeGetAllCommentsValidator = () => async (req: HttpRequest) =>
  getAllCommentsSchemaValidator(req.query);
