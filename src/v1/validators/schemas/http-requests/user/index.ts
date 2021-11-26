import {
  ApiErrorsName,
  ApiErrorsType,
  ServerConstants,
  User,
  UserRoles,
} from '../../../../../constants';
import apiMessages from '../../../../../locales/pt/api-server.json';
import { ExpressRequestSession, HttpRequest } from '../../../../../main/adapters/adapters.types';
import CustomError from '../../../../../olyn/custom-error';
import createUserSchemaValidator from './create-user-schema';
import getAllUsersSchemaValidator from './get-all-users-schema';
import updateUserSchemaValidator from './update-user-schema';

// eslint-disable-next-line import/prefer-default-export
export const makeGetAllUsersValidator = () => async (req: HttpRequest) =>
  getAllUsersSchemaValidator(req.query);

export const makeCreateUserValidator = () => async (req: HttpRequest) =>
  createUserSchemaValidator(req.body);

export const makeUpdateUserValidator = () => async (req: ExpressRequestSession) => {
  // Only an admin can update the user role
  if (
    !(
      req[ServerConstants.Session].user.role in
      [UserRoles.FindAllInAdmin, UserRoles.InstitutionAdmin]
    )
  ) {
    if (req.body[User.Role])
      throw new CustomError({
        details: { msg: 'Only an admin can update the user role' },
        statusCode: 406,
        stack: '',
        type: ApiErrorsType.AuthorizationError,
        name: ApiErrorsName.GenericName,
        i18nCode: 'E-1001',
        message: apiMessages['E-1001'],
      });
    if (req.params.id !== req[ServerConstants.Session].user.id)
      throw new CustomError({
        details: { msg: 'You can only update your own data' },
        statusCode: 406,
        stack: '',
        type: ApiErrorsType.AuthorizationError,
        name: ApiErrorsName.GenericName,
        i18nCode: 'E-1001',
        message: apiMessages['E-1001'],
      });
  }

  return updateUserSchemaValidator(req);
};
