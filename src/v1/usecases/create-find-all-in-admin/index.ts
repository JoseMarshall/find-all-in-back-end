import { ApiErrorsName, ApiErrorsType, UserRoles } from '../../../constants';
import apiMessages from '../../../locales/pt/api-server.json';
import uow from '../../../main/external/repositories/mongodb/unit-of-work';
import CustomError from '../../../olyn/custom-error';
import { makeUser } from '../../entities/user';
import { IUserInput } from '../../entities/user/user.types';

// eslint-disable-next-line import/prefer-default-export
export function createFindAllInAdminUC() {
  return async (data: IUserInput) => {
    const unitOfWork = await uow();
    try {
      await unitOfWork.startTransaction();
      const userRepo = unitOfWork.makeUserRepository();

      const createdUser = await userRepo.add(makeUser({ ...data, role: UserRoles.FindAllInAdmin }));

      await unitOfWork.commitChanges();

      return {
        payload: createdUser,
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
