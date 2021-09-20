import { Document, FilterQuery } from 'mongoose';

import { Common } from '../../../../../constants';
import { queryGuard } from '../helpers';
import { MakeGetOneEntityData } from '../mongoose.types';

// eslint-disable-next-line import/prefer-default-export
export function makeGetOneEntity<D extends Document, K>({
  model,
  options,
  transaction,
}: MakeGetOneEntityData<D, K>) {
  return async (query: { id: string; includeDeleted?: string }) => {
    const { id, includeDeleted, ...q } = query;
    const doc = await queryGuard<D>(
      model
        .findOne(
          includeDeleted
            ? ({ id, ...q } as FilterQuery<unknown>)
            : ({ id, isDeleted: false, ...q } as FilterQuery<unknown>),
          {
            [Common.MongoId]: 0,
            ...(options.projection ?? {}),
          },
          {
            session: transaction?.id ? transaction : undefined,
          }
        )
        ?.populate(options.populateOptions)
        .exec()
    );

    return options.formatData
      ? options.formatData(doc.toObject())
      : (doc.toObject() as unknown as K);
  };
}
