import { ApiErrorsName, ApiErrorsType, Citizen, Common, User } from '../../../constants';
import apiMessages from '../../../locales/pt/api-server.json';
import { MakeGetOneEntityDependencies } from '../../../main/external/repositories/mongodb/mongoose.types';
import uow from '../../../main/external/repositories/mongodb/unit-of-work';
import CustomError from '../../../olyn/custom-error';
import { ICitizen } from '../../entities/citizen/citizen.types';
import { GetOne } from '../../validators/types/sub-types';

// eslint-disable-next-line import/prefer-default-export
export function getDetailedCitizenUC() {
  return async (query: GetOne) => {
    const unitOfWork = await uow();
    try {
      const citizenRepo = unitOfWork.makeCitizenRepository();

      const citizen = await citizenRepo.get<MakeGetOneEntityDependencies<ICitizen>>(query, {
        populateOptions: {
          path: Citizen.UserAccount,
          select: { [Common.MongoId]: 0, [User.Name]: 1, [User.Email]: 1, [User.Role]: 1 },
        },
      });

      return {
        payload: citizen,
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
