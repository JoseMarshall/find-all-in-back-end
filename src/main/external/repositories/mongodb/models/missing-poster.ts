/* eslint-disable no-underscore-dangle */
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
  [MissingPoster.Photo]: { type: String, required: true },
  [MissingPoster.DisappearanceParticipation]: { type: String },
  [MissingPoster.Feedback]: { type: String },
  [MissingPoster.Address]: addressSchema,
  [MissingPoster.CreatedBy]: { type: String, required: true, ref: CollectionNames.Users },
  [MissingPoster.UpdatedBy]: { type: String, required: true, ref: CollectionNames.Users },
  [MissingPoster.PreviousStatus]: { type: String, required: true, trim: true, default: '' },
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

// eslint-disable-next-line func-names
missingPosterSchema.pre('findOneAndUpdate', async function (this: any) {
  // Only set the previousStatus if user is updating the missingPoster status
  if (this._update[MissingPoster.Status]) {
    const docToUpdate = await this.model.findOne(this.getQuery());
    this._update[MissingPoster.PreviousStatus] = docToUpdate[MissingPoster.Status];
  }
});

export default MongoHelper.getModel<MissingPosterDocument>(
  CollectionNames.MissingPosters,
  missingPosterSchema
);
