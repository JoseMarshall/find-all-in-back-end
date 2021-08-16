import { Request, Response, Router } from 'express';

import { ApiErrorsName, ApiErrorsType } from '../../../constants';
import apiMessages from '../../../locales/pt/api-server.json';
import { adaptExpressRoute, makeMsgBody } from '../../../main/adapters/express-route-adapter';
import CustomError from '../../../olyn/custom-error';
import makeLoginController from '../../factories/auth/login';

export default (router: Router) => {
  router.get('/logout', (_req: Request, res: Response) => {
    res
      .clearCookie('find-all-in-session', {
        sameSite: 'none',
        secure: process.env.NODE_ENV === 'production',
      })
      .status(200)
      .json(
        makeMsgBody(
          {
            i18nCode: 'S-3010',
            defaultValue: apiMessages['S-3010'],
          },
          {
            msg: 'User logged out',
            isAuthenticated: false,
          }
        )
      )
      .on('error', error => {
        res.status(500).json(
          makeMsgBody(
            { i18nCode: 'W-2000', defaultValue: apiMessages['W-2000'] },
            {
              error: new CustomError({
                statusCode: 500,
                name: ApiErrorsName.GenericName,
                type: ApiErrorsType.InternalError,
                message: apiMessages['W-2000'],
                i18nCode: 'W-2000',
                stack: error.stack,
                details: { ...error },
              }),
              isAuthenticated: true,
            }
          )
        );
      });
  });

  router.post('/login', adaptExpressRoute(makeLoginController));

  return router;
};
