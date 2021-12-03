import makeGetOneEntityController from '../../controllers/get-one-entity';
import { IEmployee } from '../../entities/employee/employee.types';
import { getOneEmployeeUC } from '../../usecases/get-one-employee';
import { makeGetOneEmployeeValidator } from '../../validators/schemas/http-requests/employee';
import { GetOne } from '../../validators/types/sub-types';

const getOneEmployee = makeGetOneEntityController<IEmployee, GetOne>({
  findOne: getOneEmployeeUC(),
  requestValidator: makeGetOneEmployeeValidator(),
});

export default getOneEmployee;
