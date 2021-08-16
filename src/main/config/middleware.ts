import csrf from 'csurf';
import { Express } from 'express';

import { bodyParser, contentType, cors, logger } from '../middleware';

export default (app: Express): void => {
  if (process.env.NODE_ENV === 'development') app.use(logger);
  app.use(cors);
  app.use(bodyParser);
  app.use(contentType);
  if (process.env.NODE_ENV === 'production') {
    app.use(
      csrf({
        cookie: {
          sameSite: 'none',
          secure: true,
          httpOnly: true,
          maxAge: 24 * 3600, // 24 hours
          expires: new Date(Date.now() + 24 * 3600 * 1000), // Expires in 24 hours
        },
      })
    ); // Increase the protection requiring a csrf-token
  }
};
