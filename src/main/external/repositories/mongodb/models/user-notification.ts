import { CollectionNames, UsersNotification } from '../../../../../constants';
import { MongoHelper } from '../helpers/mongo-helper';
import { UserNotificationDocument } from './model.types';
import SchemaConstructor from './schema-constructor';

const userNotificationSchema = SchemaConstructor({
  [UsersNotification.UserId]: { type: String, required: true },
  [UsersNotification.IsRead]: { type: Boolean, required: true, default: true },
  [UsersNotification.Notification]: {
    type: String,
    ref: CollectionNames.UsersNotifications,
    required: true,
  },
});

userNotificationSchema.set('toObject', {
  virtuals: true,
});

userNotificationSchema.set('toJSON', {
  virtuals: true,
});

export default MongoHelper.getModel<UserNotificationDocument>(
  CollectionNames.UsersNotifications,
  userNotificationSchema
);
