import makeCreateEntityController from '../../controllers/create-entity';
import { IEmployee, IEmployeeInput } from '../../entities/employee/employee.types';
import { createEmployeeUC } from '../../usecases/create-employee';
import { makeCreateEmployeeValidator } from '../../validators/schemas/http-requests/employee';

const createEmployee = makeCreateEntityController<IEmployee, IEmployeeInput>({
  create: createEmployeeUC(),
  requestValidator: makeCreateEmployeeValidator(),
});

export default createEmployee;
