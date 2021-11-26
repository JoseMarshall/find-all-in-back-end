import { ApiErrorsName, ApiErrorsType } from '../../../constants';
import apiMessages from '../../../locales/pt/api-server.json';
import uow from '../../../main/external/repositories/mongodb/unit-of-work';
import CustomError from '../../../olyn/custom-error';
import { makeComment } from '../../entities/comment';
import { ICommentInput } from '../../entities/comment/comment.types';

// eslint-disable-next-line import/prefer-default-export
export function postCommentUC() {
  return async (data: ICommentInput) => {
    const unitOfWork = await uow();
    try {
      const commentRepo = unitOfWork.makeCommentRepository();

      const result = await commentRepo.add(makeComment(data));

      return {
        payload: result,
      };
    } catch (error) {
      throw error instanceof CustomError
        ? error
        : new CustomError({
            statusCode: 422,
            name: ApiErrorsName.GenericName,
            type: ApiErrorsType.GenericType,
            message: apiMessages['E-1006'],
            i18nCode: 'E-1006',
            stack: error.stack,
            details: error,
          });
    }
  };
}
