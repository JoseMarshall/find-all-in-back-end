import { ApiErrorsName, ApiErrorsType } from '../../../constants';
import apiMessages from '../../../locales/pt/api-server.json';
import uow from '../../../main/external/repositories/mongodb/unit-of-work';
import CustomError from '../../../olyn/custom-error';
import { UpdateUser } from '../../validators/types/user';

// eslint-disable-next-line import/prefer-default-export
export function updateUserDataUC() {
  return async ({ body, params }: UpdateUser) => {
    const unitOfWork = await uow();
    try {
      const userRepo = unitOfWork.makeUserRepository();

      const result = await userRepo.update(params, body);

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
