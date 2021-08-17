import bcrypt from 'bcrypt';
import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import { promisify } from 'util';

import { ApiErrorsName, ApiErrorsType, Common, ServerConstants, User } from '../../../constants';
import apiMessages from '../../../locales/pt/api-server.json';
import { MakeGetOneEntityDependencies } from '../../../main/external/repositories/mongodb/mongoose.types';
import uow from '../../../main/external/repositories/mongodb/unit-of-work';
import CustomError from '../../../olyn/custom-error';
import { addDays } from '../../../utils';
import { IUser } from '../../entities/user/user.types';
import { ILogin } from '../../validators/types/login';

async function generateToken(user: IUser, res: Record<string, any>) {
  const asyncSign = promisify<
    string | Buffer | Record<string, unknown>,
    Secret,
    undefined | SignOptions,
    undefined | string
  >(jwt.sign);

  const token = await asyncSign(
    {
      [User.Role]: user.role,
      [User.Name]: user.name,
      [Common.Id]: user.id,
    },
    process.env.JWT_KEY,
    { expiresIn: '1h' }
  );

  if (!token)
    throw new CustomError({
      statusCode: 500,
      name: ApiErrorsName.GenericName,
      type: ApiErrorsType.InternalError,
      message: apiMessages['E-1021'],
      i18nCode: 'E-1021',
      stack: new Error().stack,
      details: { msg: 'Failed signing the cookie session' },
    });
  res.cookie(ServerConstants.CookieSession, token, {
    httpOnly: true,
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
    expires: addDays(new Date(), 365), // Expires in 1y
    secure: process.env.NODE_ENV === 'production',
  }); // Set a cookie with the generated token expires in 1 hour
}

// eslint-disable-next-line import/prefer-default-export
export function loginUC() {
  return async (data: ILogin, res: Record<string, any>) => {
    const unitOfWork = await uow();
    try {
      const userRepo = unitOfWork.makeUserRepository();

      const { password, ...restOfData } = data;

      const user = await userRepo.findOne<MakeGetOneEntityDependencies<IUser>>(restOfData, {
        projection: { [User.Name]: 1, [User.Role]: 1, [User.Password]: 1, [Common.Id]: 1 },
      });

      const samePassword = await bcrypt.compare(password, user.password);

      if (samePassword) {
        await generateToken(user, res);
        return {
          payload: {
            user: {
              [Common.Id]: user.id,
              [User.Name]: user.name,
              [User.Role]: user.role,
            },
          },
        };
      }

      throw new Error('Invalid username/email or password');
    } catch (error) {
      throw error instanceof CustomError
        ? error
        : new CustomError({
            statusCode: 403,
            name: ApiErrorsName.GenericName,
            type: ApiErrorsType.AuthorizationError,
            message: apiMessages['W-2001'],
            i18nCode: 'W-2001',
            stack: error.stack,
            details: error,
          });
    }
  };
}
