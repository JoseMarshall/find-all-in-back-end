import { CollectionNames, MissingPoster, MissingPosterStatus } from '../../../../../constants';
import { incTotalCount } from '../helpers/entity-model-fn';
import { MongoHelper } from '../helpers/mongo-helper';
import { MissingPosterDocument } from './model.types';
import SchemaConstructor from './schema-constructor';
import { addressSchema } from './sub-schema';

const missingPosterSchema = SchemaConstructor({
  [MissingPoster.Name]: { type: String, required: true, trim: true },
  [MissingPoster.LastSeenAt]: {
    type: String,
    required: true,
    trim: true,
  },
  [MissingPoster.LastSeenDate]: {
    type: Date,
    required: true,
  },
  [MissingPoster.Photo]: { type: String },
  [MissingPoster.Address]: addressSchema,
  [MissingPoster.CreatedBy]: { type: String, required: true, ref: CollectionNames.Users },
  [MissingPoster.Status]: {
    type: String,
    required: true,
    trim: true,
    default: MissingPosterStatus.Missing,
    enum: Object.values(MissingPosterStatus),
  },
});

missingPosterSchema.set('toObject', {
  virtuals: true,
});

missingPosterSchema.set('toJSON', {
  virtuals: true,
});

missingPosterSchema.post('save', incTotalCount);

export default MongoHelper.getModel<MissingPosterDocument>(
  CollectionNames.MissingPosters,
  missingPosterSchema
);
