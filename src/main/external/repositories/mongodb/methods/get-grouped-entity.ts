import { Document } from 'mongoose';

import { Common } from '../../../../../constants';
import { queryGuard } from '../helpers';
import { MakeGetGroupedEntityData } from '../mongoose.types';

// eslint-disable-next-line import/prefer-default-export
export function makeGetGroupedEntity<D extends Document, T>({
  model,
  options,
}: MakeGetGroupedEntityData<D, T>) {
  return async (query: { sortBy?: string; includeDeleted?: string }) => {
    const { sortBy, includeDeleted, ...filteredQuery } = query;

    const formattedQuery = options.formatQuery ? options.formatQuery(filteredQuery) : filteredQuery;
    const { id, ...groupBy } = options.groupBy;

    const documents = await queryGuard<T[]>(
      model
        .aggregate([
          ...(options.lookup ?? []),
          {
            $match: includeDeleted
              ? { ...formattedQuery }
              : { isDeleted: false, ...formattedQuery },
          },

          { $group: { [Common.MongoId]: id, ...groupBy } },
          {
            $project: {
              ...(options.projection ?? { [Common.MongoId]: 0, total: 1 }),
              name: '$_id',
            },
          },
          { $sort: JSON.parse(query.sortBy ?? `{"total":-1}`) },
        ])
        .exec()
    );

    return {
      data: options.formatData ? options.formatData(documents) : documents,
    };
  };
}
