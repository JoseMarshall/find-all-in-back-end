import { RequestValidator } from '../../../main/adapters/adapters.types';

interface Records<T> {
  data: ReadonlyArray<T>;
}

export interface MakeGetEntityGroupedDependencies<T, K> {
  groupBy: (query: K) => Promise<{ payload: Records<T> }>;
  requestValidator: RequestValidator<K>;
  queryFormatter?: (query: K) => K;
}
