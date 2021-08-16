import * as bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';

import { User } from '../../constants';
import { ApiErrorsName, ApiErrorsType } from '../../constants/errors';
import apiMessages from '../../locales/pt/api-server.json';
import CustomError from '../../olyn/custom-error';
import { makeMsgBody } from '../adapters/express-route-adapter';

// eslint-disable-next-line import/prefer-default-export
export const hashPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    req.body[User.Password] = await bcrypt.hash(req.body[User.Password], 10);
    return next();
  } catch (error) {
    return res.status(422).json(
      makeMsgBody(
        { i18nCode: 'E-1006', defaultValue: apiMessages['E-1006'] },
        {
          error: new CustomError({
            statusCode: 422,
            name: ApiErrorsName.MissingFields,
            type: ApiErrorsType.ValidationError,
            message: apiMessages['E-1006'],
            i18nCode: 'E-1006',
            stack: error.stack,
            details: error,
          }),
        }
      )
    );
  }
};
