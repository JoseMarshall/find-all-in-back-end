import {
  ApiErrorsName,
  ApiErrorsType,
  CollectionNames,
  Common,
  MissingPoster,
  User,
} from '../../../constants';
import apiMessages from '../../../locales/pt/api-server.json';
import { generateLookUp } from '../../../main/external/repositories/mongodb/helpers';
import { MakeGetAllEntitiesDependencies } from '../../../main/external/repositories/mongodb/mongoose.types';
import uow from '../../../main/external/repositories/mongodb/unit-of-work';
import CustomError from '../../../olyn/custom-error';
import { formatQueryToRegex } from '../../../utils';
import { IMissingPoster } from '../../entities/missing-poster/missing-poster.types';
import { GetAllMissingPosters } from '../../validators/types/missing-poster';

// eslint-disable-next-line import/prefer-default-export
export function getAllMissingPostersUC() {
  return async (query: GetAllMissingPosters) => {
    const unitOfWork = await uow();
    try {
      const missingPosterRepo = unitOfWork.makeMissingPosterRepository();

      const missingPoster = await missingPosterRepo.getAll<
        MakeGetAllEntitiesDependencies<IMissingPoster>
      >(query, {
        lookup: generateLookUp({
          foreignField: MissingPoster.CreatedBy,
          from: CollectionNames.Users,
          isForeignFieldArray: false,
          select: { [Common.MongoId]: 0, [Common.Id]: 1, [User.Name]: 1, [User.Email]: 1 },
        }),
        formatQuery: formatQueryToRegex,
      });

      return {
        payload: missingPoster,
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
