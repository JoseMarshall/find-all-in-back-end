import { Express, NextFunction, Request, Response, Router } from 'express';
import { readdirSync } from 'fs';

import { ApiErrorsName, ApiErrorsType, ServerConstants } from '../../constants';
import apiMessages from '../../locales/pt/api-server.json';
import CustomError from '../../olyn/custom-error';
import { logger } from '../../olyn/logger';
import { ExpressRequestSession } from '../adapters/adapters.types';
import { makeMsgBody } from '../adapters/express-route-adapter';
import { checkToken } from '../middleware/checkToken';

export default (app: Express): void => {
  app.get('/api', (_req: Request, res: Response) =>
    res.status(200).json({
      msg: 'Welcome to Find All In - API',
      date: new Date().toJSON(),
    })
  );

  /**
   * Return a new CSRF-TOKEN
   */
  app.get('/csrf-token', (req: Request, res: Response) => {
    res.send({ csrfToken: req.csrfToken() });
  });

  app.get('/auth-with-cookie', checkToken, (req: ExpressRequestSession, res: Response) => {
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
  readdirSync(`${__dirname}/../v1/routes`).map(async file => {
    if (!file.includes('__tests__')) {
      const router = (await import(`../v1/routes/${file}`)).default(Router());
      app.use(`/api/v1/${file}`, router);
    }
  });

  /**
   * In case of api v2
   */
  // readdirSync(`${__dirname}/../v2/routes`).map(async file => {
  //   if (!file.includes('__tests__')) {
  //     const router = (await import(`../v2/routes/${file}`)).default(Router());
  //     app.use(`/api/v2/${file}`, router);
  //   }
  // });

  /**
   * Global error handler, handles all generic errors
   */
  // eslint-disable-next-line no-undef
  app.use((err: NodeJS.ErrnoException, _req: Request, res: Response, _next: NextFunction) => {
    logger.error(err.message);
    return res.status(500).json(
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
    );
  });
};
