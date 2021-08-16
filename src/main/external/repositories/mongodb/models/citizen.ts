import { Citizen, CollectionNames } from '../../../../../constants';
import { incTotalCount } from '../helpers/entity-model-fn';
import { MongoHelper } from '../helpers/mongo-helper';
import { CitizenDocument } from './model.types';
import SchemaConstructor from './schema-constructor';

const citizenSchema = SchemaConstructor({
  [Citizen.Name]: { type: String, required: true, trim: true },
  [Citizen.UserAccount]: { type: String, required: true, ref: CollectionNames.Users },
});

citizenSchema.set('toObject', {
  virtuals: true,
});

citizenSchema.set('toJSON', {
  virtuals: true,
});

citizenSchema.post('save', incTotalCount);

export default MongoHelper.getModel<CitizenDocument>(CollectionNames.Citizens, citizenSchema);
