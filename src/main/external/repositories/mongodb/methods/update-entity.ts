import { Document, FilterQuery } from 'mongoose';

import { Common } from '../../../../../constants';
import { Entity } from '../../../../../v1/entities/entity.types';
import { GetOne } from '../../../../../v1/validators/types/sub-types';
import { queryGuard } from '../helpers';
import { MakeUpdateOneEntityData } from '../mongoose.types';

// eslint-disable-next-line import/prefer-default-export
export function makeUpdateOneEntity<D extends Document, T>({
  model,
  transaction,
  populateOptions = { path: '' },
}: MakeUpdateOneEntityData<D>) {
  return async (query: GetOne, body: Omit<Record<string, any>, keyof Entity>) => {
    const doc = await queryGuard<D>(
      model
        .findOneAndUpdate(
          { id: query.id, isDeleted: false } as FilterQuery<unknown>,
          body as FilterQuery<unknown>,
          {
            new: true,
            projection: { [Common.MongoId]: 0 },
            session: transaction?.id ? transaction : undefined,
          }
        )
        ?.populate(populateOptions)
        .exec()
    );
    return doc.toObject() as unknown as T;
  };
}
