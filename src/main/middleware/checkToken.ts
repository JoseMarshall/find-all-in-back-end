import { NextFunction, Response } from 'express';
import * as jwt from 'jsonwebtoken';

import {
  ApiErrorsName,
  ApiErrorsType,
  CollectionNames,
  Common,
  ServerConstants,
  User,
} from '../../constants';
import apiMessages from '../../locales/pt/api-server.json';
import CustomError from '../../olyn/custom-error';
import { ExpressRequestSession, Session } from '../adapters/adapters.types';
import { makeMsgBody } from '../adapters/express-route-adapter';
import { MongoHelper } from '../external/repositories/mongodb/helpers';
import { UserDocument } from '../external/repositories/mongodb/models/model.types';

// eslint-disable-next-line import/prefer-default-export
export const checkToken = async (
  req: ExpressRequestSession,
  res: Response,
  next?: NextFunction
) => {
  const incomingToken = req.cookies['find-all-in-session'];
  if (!incomingToken) {
    return res.status(401).json(
      makeMsgBody(
        { i18nCode: 'E-1000', defaultValue: apiMessages['E-1000'] },
        {
          error: new CustomError({
            statusCode: 401,
            name: ApiErrorsName.ProtectedResource,
            type: ApiErrorsType.AuthorizationError,
            message: apiMessages['E-1000'],
            i18nCode: 'E-1000',
            stack: new Error().stack,
            details: { msg: 'Not authenticated', isAuthenticated: false },
          }),
        }
      )
    );
  }
  const decodedToken = jwt.verify(incomingToken, process.env.JWT_KEY) as Session;

  const user = (await MongoHelper.getCollection(CollectionNames.Users).findOne({
    [Common.Id]: decodedToken.user.id,
    [User.Role]: decodedToken.user.role,
    [Common.IsDeleted]: false,
  })) as UserDocument;

  if (user) {
    Object.assign(req, { [ServerConstants.Session]: decodedToken });
    return next ? next() : decodedToken;
  }

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
          stack: new Error().stack,
          details: {},
        }),
      }
    )
  );
};
