import { RequestValidator, Session } from '../../../main/adapters/adapters.types';
import { ILogin } from '../../validators/types/login';

export interface MakeLoginDependency {
  login: (body: ILogin) => Promise<{ payload: Session }>;
  requestValidator: RequestValidator<ILogin>;
}
