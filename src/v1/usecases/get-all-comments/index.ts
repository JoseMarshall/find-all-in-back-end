import {
  ApiErrorsName,
  ApiErrorsType,
  CollectionNames,
  Comment,
  Common,
  User,
} from '../../../constants';
import apiMessages from '../../../locales/pt/api-server.json';
import { generateLookUp } from '../../../main/external/repositories/mongodb/helpers';
import { MakeGetAllEntitiesDependencies } from '../../../main/external/repositories/mongodb/mongoose.types';
import uow from '../../../main/external/repositories/mongodb/unit-of-work';
import CustomError from '../../../olyn/custom-error';
import { formatQueryToRegex } from '../../../utils';
import { IComment } from '../../entities/comment/comment.types';
import { GetAllComments } from '../../validators/types/comment';

// eslint-disable-next-line import/prefer-default-export
export function getAllCommentsUC() {
  return async (query: GetAllComments) => {
    const unitOfWork = await uow();
    try {
      const commentRepo = unitOfWork.makeCommentRepository();

      const comment = await commentRepo.getAll<MakeGetAllEntitiesDependencies<IComment>>(query, {
        lookup: generateLookUp({
          foreignField: Comment.PostedBy,
          from: CollectionNames.Users,
          isForeignFieldArray: false,
          select: {
            [Common.MongoId]: 0,
            [Common.Id]: 1,
            [User.Name]: 1,
            [User.Email]: 1,
            [User.Photo]: 1,
          },
        }),
        formatQuery: formatQueryToRegex,
      });

      return {
        payload: comment,
      };
    } catch (error) {
      throw error instanceof CustomError
        ? error
        : new CustomError({
            statusCode: 404,
            name: ApiErrorsName.GenericName,
            type: ApiErrorsType.GenericType,
            message: apiMessages['E-1008'],
            i18nCode: 'E-1008',
            stack: error.stack,
            details: error,
          });
    }
  };
}
