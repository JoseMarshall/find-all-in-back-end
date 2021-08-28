import { CollectionNames, User, UserRoles } from '../../../../../constants';
import { incTotalCount } from '../helpers/entity-model-fn';
import { MongoHelper } from '../helpers/mongo-helper';
import { UserDocument } from './model.types';
import SchemaConstructor from './schema-constructor';

const userSchema = SchemaConstructor({
  [User.Name]: { type: String, required: true, trim: true },
  [User.Email]: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  [User.Username]: { type: String, unique: true, required: true, trim: true },
  [User.Password]: { type: String, required: true, select: false },
  [User.CreatedBy]: { type: String, required: false, ref: CollectionNames.Users },
  [User.Role]: {
    type: String,
    required: true,
    trim: true,
    enum: Object.values(UserRoles),
  },
});

userSchema.set('toObject', {
  virtuals: true,
});

userSchema.set('toJSON', {
  virtuals: true,
});

userSchema.post('save', incTotalCount);

export default MongoHelper.getModel<UserDocument>(CollectionNames.Users, userSchema);
