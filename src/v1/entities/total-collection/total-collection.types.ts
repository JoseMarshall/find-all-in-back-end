import { CollectionNames, TotalCountCollection } from '../../../constants';
import { Entity } from '../entity.types';

export interface ITotalCollection extends Entity {
  [TotalCountCollection.CollectionName]: `${CollectionNames}`;
  [TotalCountCollection.TotalCount]: number;
}
