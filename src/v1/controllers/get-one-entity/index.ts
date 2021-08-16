import { ApiErrorsI18nCode } from '../../../constants';
import apiMessages from '../../../locales/pt/api-server.json';
import { HttpRequest } from '../../../main/adapters/adapters.types';
import { MakeGetOneEntityDependencies } from './get-one-entity.types';

function makeGetOneEntityController<D, K>({
  findOne,
  requestValidator,
  queryFormatter,
}: MakeGetOneEntityDependencies<D, K>) {
  return async (req: HttpRequest) => {
    const validatedQuery = await requestValidator(req);
    const result = await findOne(queryFormatter ? queryFormatter(validatedQuery) : validatedQuery);

    return {
      status: 200,
      body: result.payload,
      msg: {
        i18nCode: 'S-3002' as ApiErrorsI18nCode,
        defaultValue: apiMessages['S-3002'],
      },
    };
  };
}

export default makeGetOneEntityController;
