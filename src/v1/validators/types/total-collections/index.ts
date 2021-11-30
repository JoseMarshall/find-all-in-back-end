import { TotalCountCollection } from '../../../../constants';
import { GetAll } from '../sub-types';

interface InQuery {
  $in: ReadonlyArray<string>;
}
export interface GetAllTotalCollections extends GetAll {
  [TotalCountCollection.CollectionName]?: string | InQuery;
}
