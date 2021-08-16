import { HttpRequest } from '../../../../../main/adapters/adapters.types';
import createUserSchemaValidator from './create-user-schema';
import getAllUsersSchemaValidator from './get-all-users-schema';

// eslint-disable-next-line import/prefer-default-export
export const makeGetAllUsersValidator = () => async (req: HttpRequest) =>
  getAllUsersSchemaValidator(req.query);

export const makeCreateUserValidator = () => async (req: HttpRequest) =>
  createUserSchemaValidator(req.body);
