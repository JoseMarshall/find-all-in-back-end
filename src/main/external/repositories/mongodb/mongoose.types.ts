import { ClientSession, Document, FilterQuery, Model, PopulateOptions } from 'mongoose';

import { Common, TimeStamps } from '../../../../constants';

export interface MakeGetAllEntitiesDependencies<K> {
  projection?: Record<string, 0 | 1 | boolean>;
  formatData?: (data: ReadonlyArray<any>) => ReadonlyArray<K>;
  formatQuery?: (query: Record<string, string> | {}) => Record<string, unknown>;
  lookup?: ReadonlyArray<Record<string, unknown>>;
}

export interface MakeGetGroupedEntityDependencies<K = any> {
  projection?: Record<string & 'name', 0 | 1 | boolean | string>;
  formatData?: (data: ReadonlyArray<any>) => ReadonlyArray<K>;
  formatQuery?: (query: Record<string, string> | {}) => Record<string, unknown>;
  lookup?: ReadonlyArray<Record<string, unknown>>;
  groupBy: Record<string & Common.Id, unknown>;
}

export interface MakeGetOneEntityDependencies<K> {
  projection?: Record<string, 0 | 1 | boolean>;
  populateOptions?: Array<PopulateOptions> | PopulateOptions;
  formatData?: (data: any) => K;
}

interface TotalCount {
  total: number;
}

export interface GetAllEntitiesAggregatedData<T> {
  data: ReadonlyArray<T>;
  count: TotalCount[];
}

export interface GetAllEntitiesData<T> {
  data: ReadonlyArray<T>;
  count: number;
}

export interface LookUpOptions {
  /**
   * Specifies the name of collection (right collection) in the same database to perform the join with
   */
  from: string;
  /**
   * Specifies the name of the target join field (in the left collection)
   */
  foreignField: string;
  /**
   * Specifies if foreignField is either an array of ObjectId or not
   */
  isForeignFieldArray: boolean;
  /**
   * Specifies the name of the target join field (in the right collection) (id by default)
   */
  connectTo?: string;
  /**
   * Specifies the match expression to apply to the target collection (right collection),
   * if specified, should include the match expression for the foreign_id, this overrides the `foreignField` and `connectTo` LookUpOptions
   * The value can be any valid aggregation expression.
   */
  matchExp?: FilterQuery<any>;
  /**
   * Specifies the name of the new array field to add to the input documents.
   * If the specified name already exists in the input document, the existing field is overwritten.
   */
  alias?: string;
  /**
   * The limit of documents to lookup (in case of foreign field is an array of ObjectId)
   */
  limit?: number;
  /**
   * The field to sort by, the sort order can be either ascending (1) or descending (-1)
   */
  sort?: Record<string, -1 | 1>;
  /**
   * Indicates which fields should be selected/projected in the lookup result use 0 to exclude and 1 to include, you should not mix inclusions and exclusions options, except for _id field
   */
  select?: Record<string, 0 | 1 | boolean>;
}

export interface MakeGetOneEntityData<D extends Document, K> {
  model: Model<D>;
  options: MakeGetOneEntityDependencies<K>;
  transaction?: ClientSession;
}

export interface MakeGetAllEntityData<D extends Document, K> {
  model: Model<D>;
  options: MakeGetAllEntitiesDependencies<K>;
}

export interface MakeGetGroupedEntityData<D extends Document, K> {
  model: Model<D>;
  options: MakeGetGroupedEntityDependencies<K>;
}

export interface MakeUpdateOneEntityData<D extends Document> {
  model: Model<D>;
  transaction?: ClientSession;
  populateOptions?: Array<PopulateOptions> | PopulateOptions;
}

export interface MakeCreateEntityData<D extends Document> {
  model: Model<D>;
  transaction?: ClientSession;
}

export interface MakeDeleteOneEntityData<D extends Document> {
  model: Model<D>;
  transaction?: ClientSession;
}

export interface DeletedEntity {
  [Common.Id]: string;
  [Common.IsDeleted]: boolean;
  [TimeStamps.CreatedAt]: string;
  [TimeStamps.UpdatedAt]: string;
}
