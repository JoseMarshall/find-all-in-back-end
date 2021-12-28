import {
  ApiErrorsName,
  ApiErrorsType,
  MissingPoster,
  MissingPosterApprovalStatus,
} from '../../../constants';
import apiMessages from '../../../locales/pt/api-server.json';
import uow from '../../../main/external/repositories/mongodb/unit-of-work';
import CustomError from '../../../olyn/custom-error';
import { GetOne } from '../../validators/types/sub-types';

// eslint-disable-next-line import/prefer-default-export
export function denyMissingPosterUC() {
  return async (query: GetOne) => {
    const unitOfWork = await uow();
    try {
      const missingPosterRepo = unitOfWork.makeMissingPosterRepository();

      const result = await missingPosterRepo.update(query, {
        [MissingPoster.ApprovalStatus]: MissingPosterApprovalStatus.Denied,
      });

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
            message: apiMessages['E-1004'],
            i18nCode: 'E-1004',
            stack: error.stack,
            details: error,
          });
    }
  };
}
