import { ApiErrorsI18nCode } from '../../../../constants';
import apiMessages from '../../../../locales/pt/api-server.json';
import { HttpRequest } from '../../../../main/adapters/adapters.types';
import { MakeLoginDependency } from '../auth.types';

function makeLoginController({ login, requestValidator }: MakeLoginDependency) {
  return async (req: HttpRequest, _res: Record<string, any>) => {
    const validatedBody = await requestValidator(req);
    const result = await login(validatedBody);

    return {
      status: 200,
      body: result.payload,
      msg: {
        i18nCode: 'S-3009' as ApiErrorsI18nCode,
        defaultValue: apiMessages['S-3009'],
      },
    };
  };
}

export default makeLoginController;
