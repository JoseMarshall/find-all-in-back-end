import { RequestValidator } from '../../../main/adapters/adapters.types';

export interface MakeCreateOneEntityDependencies<T, K> {
  create: (body: K) => Promise<{ payload: T }>;
  requestValidator: RequestValidator<K>;
}
