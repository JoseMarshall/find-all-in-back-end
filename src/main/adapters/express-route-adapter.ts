import { Request, Response } from 'express';

import { ApiErrorsI18nCode, ApiErrorsName, ApiErrorsType } from '../../constants/errors';
import apiMessages from '../../locales/pt/api-server.json';
import CustomError from '../../olyn/custom-error';
import { Controller, MessageBody } from './adapters.types';

export const makeMsgBody = (msg: MessageBody, payload: Record<string, any>) => ({ msg, payload });

export const adaptExpressRoute =
  (controller: Controller) => async (req: Request, res: Response) => {
    try {
      const data = await controller(req, res);
      return res.status(data.status).json(makeMsgBody(data.msg, data.body));
    } catch (error) {
      return error instanceof CustomError
        ? res
            .status(error.statusCode)
            .json(makeMsgBody({ i18nCode: error.i18nCode, defaultValue: error.message }, { error }))
        : res.status(500).json(
            makeMsgBody(
              { i18nCode: 'E-1002', defaultValue: apiMessages['E-1002'] },
              {
                error: new CustomError({
                  statusCode: 500,
                  name: ApiErrorsName.GenericName,
                  type: ApiErrorsType.GenericType,
                  message: apiMessages['E-1002'],
                  i18nCode: 'E-1002',
                  stack: error.stack,
                  details: error,
                }),
              }
            )
          );
    }
  };

export function invalidRouteHandler() {
  return async (req: Request) => ({
    status: 404,
    body: { method: req.method, url: req.url },
    msg: {
      i18nCode: 'E-1005' as ApiErrorsI18nCode,
      defaultValue: apiMessages['E-1005'],
    },
  });
}
