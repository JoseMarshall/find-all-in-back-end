import { ApiErrorsI18nCode } from '../../../constants';
import apiMessages from '../../../locales/pt/api-server.json';
import { HttpRequest } from '../../../main/adapters/adapters.types';
import { MakeCreateOneEntityDependencies } from './create-entity.types';

function makeCreateOneEntityController<D, K>({
  create,
  requestValidator,
}: MakeCreateOneEntityDependencies<D, K>) {
  return async (req: HttpRequest) => {
    const validatedBody = await requestValidator(req);
    const result = await create(validatedBody);

    return {
      status: 201,
      body: result.payload,
      msg: {
        i18nCode: 'S-3000' as ApiErrorsI18nCode,
        defaultValue: apiMessages['S-3000'],
      },
    };
  };
}

export default makeCreateOneEntityController;
