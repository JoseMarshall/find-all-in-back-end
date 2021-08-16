import { ApiErrorsName, ApiErrorsType, Citizen, UserRoles } from '../../../constants';
import apiMessages from '../../../locales/pt/api-server.json';
import uow from '../../../main/external/repositories/mongodb/unit-of-work';
import CustomError from '../../../olyn/custom-error';
import { makeCitizen } from '../../entities/citizen';
import { ICitizenInput } from '../../entities/citizen/citizen.types';
import { makeUser } from '../../entities/user';

// eslint-disable-next-line import/prefer-default-export
export function citizenSignUpUC() {
  return async (data: ICitizenInput) => {
    const unitOfWork = await uow();
    try {
      await unitOfWork.startTransaction();
      const userRepo = unitOfWork.makeUserRepository();

      const createdUser = await userRepo.add(makeUser({ ...data, role: UserRoles.Citizen }));

      const citizenRepo = unitOfWork.makeCitizenRepository();

      const createdCitizen = await citizenRepo.add(
        makeCitizen({ [Citizen.Name]: data.name, [Citizen.UserAccount]: createdUser.id })
      );

      await unitOfWork.commitChanges();

      return {
        payload: createdCitizen,
      };
    } catch (error) {
      await unitOfWork.rollback();
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
