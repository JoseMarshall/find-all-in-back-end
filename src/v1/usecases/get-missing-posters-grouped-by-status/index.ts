import { ApiErrorsName, ApiErrorsType, MissingPoster } from '../../../constants';
import apiMessages from '../../../locales/pt/api-server.json';
import { MakeGetGroupedEntityDependencies } from '../../../main/external/repositories/mongodb/mongoose.types';
import uow from '../../../main/external/repositories/mongodb/unit-of-work';
import CustomError from '../../../olyn/custom-error';
import { GroupedBy } from '../../entities/entity.types';

// eslint-disable-next-line import/prefer-default-export
export function getMissingPostersGroupedByStatusUC() {
  return async () => {
    const unitOfWork = await uow();
    try {
      const missingPosterRepo = unitOfWork.makeMissingPosterRepository();

      const missingPosterGrouped = await missingPosterRepo.getGroupedData<
        MakeGetGroupedEntityDependencies<GroupedBy<string>>
      >(
        {},
        {
          groupBy: {
            id: `$${MissingPoster.Status}`,
            total: {
              $sum: 1,
            },
          },
        }
      );

      return {
        payload: missingPosterGrouped,
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
