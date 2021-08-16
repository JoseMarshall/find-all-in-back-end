import { CollectionNames, TotalCountCollection } from '../../../../../constants';
import { MongoHelper } from '../helpers';
import { TotalCollectionsDocument } from './model.types';
import SchemaConstructor from './schema-constructor';

const totalCollectionsDocumentSchema = SchemaConstructor({
  [TotalCountCollection.CollectionName]: { type: String, required: true, unique: true },
  [TotalCountCollection.TotalCount]: { type: Number, required: true, default: 1 },
});

totalCollectionsDocumentSchema.set('toObject', {
  virtuals: true,
});

totalCollectionsDocumentSchema.set('toJSON', {
  virtuals: true,
});

export default MongoHelper.getModel<TotalCollectionsDocument>(
  CollectionNames.TotalCountCollections,
  totalCollectionsDocumentSchema
);
