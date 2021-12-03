import { ApiErrorsName, ApiErrorsType, Employee, UserRoles } from '../../../constants';
import apiMessages from '../../../locales/pt/api-server.json';
import uow from '../../../main/external/repositories/mongodb/unit-of-work';
import CustomError from '../../../olyn/custom-error';
import { makeEmployee } from '../../entities/employee';
import { IEmployeeInput } from '../../entities/employee/employee.types';
import { makeUser } from '../../entities/user';

// eslint-disable-next-line import/prefer-default-export
export function createEmployeeUC() {
  return async (data: IEmployeeInput) => {
    const unitOfWork = await uow();
    try {
      await unitOfWork.startTransaction();
      const userRepo = unitOfWork.makeUserRepository();

      const createdUser = await userRepo.add(
        makeUser({ ...data, role: UserRoles.FindAllInEmployee })
      );

      const employeeRepo = unitOfWork.makeEmployeeRepository();

      const createdEmployee = await employeeRepo.add(
        makeEmployee({
          [Employee.Name]: data.name,
          [Employee.UserAccount]: createdUser.id,
          role: data.role,
          identificationNumber: data.identificationNumber,
        })
      );

      await unitOfWork.commitChanges();

      return {
        payload: createdEmployee,
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
