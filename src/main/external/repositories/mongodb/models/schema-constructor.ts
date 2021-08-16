import { DocumentDefinition, Schema, SchemaDefinition } from 'mongoose';

import { Common } from '../../../../../constants';

export default (schemaDefinition: SchemaDefinition<DocumentDefinition<any>>) =>
  new Schema<any, any>(
    {
      [Common.Id]: { type: String, required: true, trim: true, unique: true, index: true },
      [Common.MongoId]: { type: String },
      [Common.IsDeleted]: { type: Boolean, default: false },
      ...schemaDefinition,
    },
    { timestamps: true, versionKey: false }
  );
