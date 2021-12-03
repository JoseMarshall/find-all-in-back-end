import { ApiErrorsName, ApiErrorsType } from '../../../constants';
import apiMessages from '../../../locales/pt/api-server.json';
import { MakeGetOneEntityDependencies } from '../../../main/external/repositories/mongodb/mongoose.types';
import uow from '../../../main/external/repositories/mongodb/unit-of-work';
import CustomError from '../../../olyn/custom-error';
import { IEmployee } from '../../entities/employee/employee.types';
import { GetOne } from '../../validators/types/sub-types';

// eslint-disable-next-line import/prefer-default-export
export function getOneEmployeeUC() {
  return async (query: GetOne) => {
    const unitOfWork = await uow();
    try {
      const employeeRepo = unitOfWork.makeEmployeeRepository();

      const result = await employeeRepo.get<MakeGetOneEntityDependencies<IEmployee>>(query, {});

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
            message: apiMessages['E-1008'],
            i18nCode: 'E-1008',
            stack: error.stack,
            details: error,
          });
    }
  };
}
