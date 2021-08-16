import { Document } from 'mongoose';

import { Common } from '../../../../../constants';
import { Entity } from '../../../../../v1/entities/entity.types';
import { queryGuard } from '../helpers';
import { MakeCreateEntityData } from '../mongoose.types';

// eslint-disable-next-line import/prefer-default-export
export function makeCreateEntity<D extends Document, K extends Entity>({
  model,
  transaction,
}: MakeCreateEntityData<D>) {
  return async (body: K) => {
    const doc = (
      await queryGuard<D[]>(
        model.create([{ ...body, [Common.MongoId]: body[Common.Id] }], {
          session: transaction.id ? transaction : undefined,
        })
      )
    )[0];
    delete doc[Common.MongoId];
    return doc as unknown as K;
  };
}
