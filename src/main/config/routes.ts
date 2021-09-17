import { Express, NextFunction, Request, Response, Router } from 'express';
import { readdir } from 'fs';
import path from 'path';
import { promisify } from 'util';

import { ApiErrorsName, ApiErrorsType, ServerConstants } from '../../constants';
import apiMessages from '../../locales/pt/api-server.json';
import CustomError from '../../olyn/custom-error';
import { logger } from '../../olyn/logger';
import { addDays } from '../../utils';
import { ExpressRequestSession } from '../adapters/adapters.types';
import { makeMsgBody } from '../adapters/express-route-adapter';
import { checkToken } from '../middleware/checkToken';
import handleInvalidRoute from './handle-invalid-route';

export default async (app: Express): Promise<void> => {
  app.get('/api', (_req: Request, res: Response) =>
    res.status(200).json({
      msg: 'Welcome to Find All In - API',
      date: new Date().toJSON(),
    })
  );

  /**
   * Return a new CSRF-TOKEN
   */
  app.get('/api/csrf-token', (req: Request, res: Response) => {
    res.cookie('csrf-token', req.csrfToken(), {
      httpOnly: true,
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
      expires: addDays(new Date(), 365), // Expires in 1y
      secure: process.env.NODE_ENV === 'production',
    });
    res.status(200).json({ csrfToken: true });
  });

  app.get('/api/auth-with-cookie', checkToken, (req: ExpressRequestSession, res: Response) => {
    res.status(200).json(
      makeMsgBody(
        { i18nCode: 'S-3009', defaultValue: apiMessages['S-3009'] },
        {
          msg: 'Authenticated',
          isAuthenticated: true,
          ...req[ServerConstants.Session],
        }
      )
    );
  });

  /**
   * Load all routes from v1 routes folder
   */

  const readdirAsync = promisify(readdir);
  const routes = await readdirAsync(path.resolve(__dirname, '../../v1/routes'));
  await Promise.all(
    routes.flatMap(route => [
      (async r => {
        if (!r.includes('__tests__')) {
          const router = (await import(`../../v1/routes/${r}`)).default(Router());
          app.use(`/api/v1/${r}`, router);
        }
      })(route),
    ])
  );

  handleInvalidRoute(app);

  /**
   * Csrf error handler, handles all generic errors
   */
  app.use((err: any, _req: Request, res: Response, next: NextFunction) => {
    logger.error(_req.cookies);
    return err.code === 'EBADCSRFTOKEN'
      ? res.status(403).json(
          makeMsgBody(
            { i18nCode: 'E-1010', defaultValue: apiMessages['E-1010'] },
            {
              error: new CustomError({
                statusCode: 403,
                name: ApiErrorsName.InvalidToken,
                type: ApiErrorsType.AuthorizationError,
                message: apiMessages['E-1010'],
                i18nCode: 'E-1010',
                stack: err.stack ?? '',
                details: err,
              }),
            }
          )
        )
      : next(err);
  });

  /**
   * Global error handler, handles all generic errors
   */
  app.use((err: Error, _req: Request, res: Response, _next: NextFunction) =>
    res.status(500).json(
      makeMsgBody(
        { i18nCode: 'E-1002', defaultValue: apiMessages['E-1002'] },
        {
          error: new CustomError({
            statusCode: 500,
            name: ApiErrorsName.GenericName,
            type: ApiErrorsType.GenericType,
            message: apiMessages['E-1002'],
            i18nCode: 'E-1002',
            stack: err.stack ?? '',
            details: { ...err },
          }),
        }
      )
    )
  );
};
