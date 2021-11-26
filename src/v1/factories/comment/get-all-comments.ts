import makeGetAllEntityController from '../../controllers/get-all-entities';
import { IComment } from '../../entities/comment/comment.types';
import { getAllCommentsUC } from '../../usecases/get-all-comments';
import { makeGetAllCommentsValidator } from '../../validators/schemas/http-requests/comment';
import { GetAllComments } from '../../validators/types/comment';

const getAllComment = makeGetAllEntityController<IComment, GetAllComments>({
  findAll: getAllCommentsUC(),
  requestValidator: makeGetAllCommentsValidator(),
});

export default getAllComment;
