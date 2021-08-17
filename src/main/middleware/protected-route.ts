import { NextFunction, Response } from 'express';

import { ApiErrorsName, ApiErrorsType, UserRoles } from '../../constants';
import apiMessages from '../../locales/pt/api-server.json';
import CustomError from '../../olyn/custom-error';
import { ExpressRequestSession, Session } from '../adapters/adapters.types';
import { makeMsgBody } from '../adapters/express-route-adapter';
import { checkToken } from './checkToken';

type ProtectedRouteRole =
  | {
      allowedRoles: ReadonlyArray<UserRoles>;
      notAllowedRoles?: never;
    }
  | {
      notAllowedRoles: ReadonlyArray<UserRoles>;
      allowedRoles?: never;
    };

// eslint-disable-next-line import/prefer-default-export
export const protect =
  (rolesSettings: ProtectedRouteRole) =>
  async (req: ExpressRequestSession, res: Response, next: NextFunction) => {
    try {
      const session = (await checkToken(req, res)) as Session;

      if (!session) {
        return res.status(401).send(
          makeMsgBody(
            { i18nCode: 'E-1000', defaultValue: apiMessages['E-1000'] },
            {
              error: new CustomError({
                statusCode: 401,
                name: ApiErrorsName.ProtectedResource,
                type: ApiErrorsType.AuthorizationError,
                message: apiMessages['E-1000'],
                i18nCode: 'E-1000',
                stack: '',
                details: {
                  msg: 'This route is protected and you need to be signed in to access it',
                },
              }),
            }
          )
        );
      }

      const { role } = session.user;

      if (
        rolesSettings.allowedRoles
          ? !rolesSettings.allowedRoles.includes(role)
          : !rolesSettings.notAllowedRoles.includes(role)
      ) {
        return res.status(403).json(
          makeMsgBody(
            { i18nCode: 'E-1001', defaultValue: apiMessages['E-1001'] },
            {
              error: new CustomError({
                statusCode: 403,
                name: ApiErrorsName.ProtectedResource,
                type: ApiErrorsType.AuthorizationError,
                message: apiMessages['E-1001'],
                i18nCode: 'E-1001',
                stack: '',
                details: {
                  msg: 'You are not allowed to access this route, it means your role is not listed in the allowed roles',
                },
              }),
            }
          )
        );
      }

      return next();
    } catch (error) {
      return res.status(500).json(
        makeMsgBody(
          { i18nCode: 'E-1002', defaultValue: apiMessages['E-1002'] },
          {
            error: new CustomError({
              statusCode: 500,
              name: ApiErrorsName.GenericName,
              type: ApiErrorsType.InternalError,
              message: apiMessages['E-1002'],
              i18nCode: 'E-1002',
              stack: error.stack,
              details: {
                error,
              },
            }),
          }
        )
      );
    }
  };
