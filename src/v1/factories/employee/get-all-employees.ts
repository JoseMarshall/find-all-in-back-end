import makeGetAllEntitiesController from '../../controllers/get-all-entities';
import { IEmployee } from '../../entities/employee/employee.types';
import { getAllEmployeesUC } from '../../usecases/get-all-employees';
import { makeGetAllEmployeesValidator } from '../../validators/schemas/http-requests/employee';
import { GetAllEmployees } from '../../validators/types/employee';

const getAllEmployees = makeGetAllEntitiesController<IEmployee, GetAllEmployees>({
  findAll: getAllEmployeesUC(),
  requestValidator: makeGetAllEmployeesValidator(),
});

export default getAllEmployees;
