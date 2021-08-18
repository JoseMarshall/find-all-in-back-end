import { Document } from 'mongoose';

import { ApiErrorsName, ApiErrorsType, Common } from '../../../../../constants';
import apiMessages from '../../../../../locales/pt/api-server.json';
import CustomError from '../../../../../olyn/custom-error';
import { Entity } from '../../../../../v1/entities/entity.types';
import { queryGuard } from '../helpers';
import { MakeCreateEntityData } from '../mongoose.types';

// eslint-disable-next-line import/prefer-default-export
export function makeCreateEntity<D extends Document, K extends Entity>({
  model,
  transaction,
}: MakeCreateEntityData<D>) {
  return async (body: K) => {
    try {
      const doc = (
        await queryGuard<D[]>(
          model.create([{ ...body, [Common.MongoId]: body[Common.Id] }], {
            session: transaction?.id ? transaction : undefined,
          })
        )
      )[0];
      delete doc[Common.MongoId];
      return doc as unknown as K;
    } catch (error) {
      // Verify if its a mongoDB duplicate key error
      throw error.code === 11000
        ? new CustomError({
            statusCode: 422,
            name: ApiErrorsName.DuplicateKey,
            type: ApiErrorsType.ValidationError,
            message: apiMessages['E-1022'],
            i18nCode: 'E-1022',
            stack: error.stack,
            details: { existingFields: error.keyValue, msg: error.message },
          })
        : error;
    }
  };
}
