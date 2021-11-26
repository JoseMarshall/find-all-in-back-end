import makeCreateEntityController from '../../controllers/create-entity';
import { IComment, ICommentInput } from '../../entities/comment/comment.types';
import { postCommentUC } from '../../usecases/post-comment';
import { makeCreateCommentValidator } from '../../validators/schemas/http-requests/comment';

const createComment = makeCreateEntityController<IComment, ICommentInput>({
  create: postCommentUC(),
  requestValidator: makeCreateCommentValidator(),
});

export default createComment;
