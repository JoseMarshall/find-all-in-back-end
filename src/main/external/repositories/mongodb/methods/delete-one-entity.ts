import { Document, FilterQuery } from 'mongoose';

import { Common, TimeStamps } from '../../../../../constants';
import { GetOne } from '../../../../../v1/validators/types/sub-types';
import { queryGuard } from '../helpers';
import { DeletedEntity, MakeDeleteOneEntityData } from '../mongoose.types';

// eslint-disable-next-line import/prefer-default-export
export function makeDeleteOneEntity<D extends Document>({
  model,
  transaction,
}: MakeDeleteOneEntityData<D>) {
  return async (query: GetOne) => {
    const doc = await queryGuard<D>(
      model
        .findOneAndUpdate(
          { id: query.id, isDeleted: false } as FilterQuery<unknown>,
          { isDeleted: true } as FilterQuery<unknown>,
          {
            projection: {
              [Common.MongoId]: 0,
              [Common.Id]: 1,
              [Common.IsDeleted]: 1,
              [TimeStamps.CreatedAt]: 1,
              [TimeStamps.UpdatedAt]: 1,
            },
            new: true,
            session: transaction.id ? transaction : undefined,
          }
        )
        .lean()
    );
    return doc as unknown as DeletedEntity;
  };
}
