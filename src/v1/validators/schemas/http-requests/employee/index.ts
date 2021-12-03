import { HttpRequest } from '../../../../../main/adapters/adapters.types';
import createEmployeeSchemaValidator from './create-employee-schema';
import deleteEmployeeSchemaValidator from './delete-one-employee-schema';
import getAllEmployeeSchemaValidator from './get-all-employees-schema';
import getOneEmployeeSchemaValidator from './get-one-employee-schema';

export const makeCreateEmployeeValidator = () => async (req: HttpRequest) =>
  createEmployeeSchemaValidator(req.body);

export const makeGetOneEmployeeValidator = () => async (req: HttpRequest) =>
  getOneEmployeeSchemaValidator(req.params);

export const makeDeleteOneEmployeeValidator = () => async (req: HttpRequest) =>
  deleteEmployeeSchemaValidator(req.params);

export const makeGetAllEmployeesValidator = () => async (req: HttpRequest) =>
  getAllEmployeeSchemaValidator(req.query);
