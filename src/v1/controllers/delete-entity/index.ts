import { ApiErrorsI18nCode } from '../../../constants';
import apiMessages from '../../../locales/pt/api-server.json';
import { HttpRequest } from '../../../main/adapters/adapters.types';
import { MakeDeleteEntityDependencies } from './delete-entity.types';

function makeDeleteEntityController<D, K>({
  deleteAll,
  requestValidator,
}: MakeDeleteEntityDependencies<D, K>) {
  return async (req: HttpRequest) => {
    const validatedReq = await requestValidator(req);

    const result = await deleteAll(validatedReq);

    return {
      status: 200,
      body: result.payload,
      msg: {
        i18nCode: 'S-3001' as ApiErrorsI18nCode,
        defaultValue: apiMessages['S-3001'],
      },
    };
  };
}

export default makeDeleteEntityController;
