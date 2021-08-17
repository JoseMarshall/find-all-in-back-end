import cookieParser from 'cookie-parser';
import csrf from 'csurf';
import { Express } from 'express';

import { bodyParser, contentType, cors, logger } from '../middleware';

export default (app: Express): void => {
  if (process.env.NODE_ENV === 'development') app.use(logger);
  app.use(cors);
  app.use(bodyParser);
  app.use(cookieParser());
  app.use(contentType);
  app.use(
    csrf({
      cookie: {
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        maxAge: 24 * 3600, // 24 hours
        expires: new Date(Date.now() + 24 * 3600 * 1000), // Expires in 24 hours
      },
      value: req => req.cookies['csrf-token'] ?? req.cookies['CSRF-Token'],
    })
  );
};
