import { ApiErrorsName, ApiErrorsType } from '../../../constants';
import apiMessages from '../../../locales/pt/api-server.json';
import uow from '../../../main/external/repositories/mongodb/unit-of-work';
import CustomError from '../../../olyn/custom-error';
import { formatQueryToRegex } from '../../../utils';
import { GetAllTotalCollections } from '../../validators/types/total-collections';

// eslint-disable-next-line import/prefer-default-export
export function getAllTotalCollectionsUC() {
  return async (req: GetAllTotalCollections) => {
    const unitOfWork = await uow();
    try {
      const totalCollectionRepo = unitOfWork.makeTotalCollectionRepository();

      const notifications = await totalCollectionRepo.getAll(req, {
        formatQuery: formatQueryToRegex,
      });

      return {
        payload: notifications,
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
