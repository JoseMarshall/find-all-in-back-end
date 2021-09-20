import { CollectionNames, Notification, NotificationTypes } from '../../../../../constants';
import { MongoHelper } from '../helpers/mongo-helper';
import { NotificationDocument } from './model.types';
import SchemaConstructor from './schema-constructor';

const notificationSchema = SchemaConstructor({
  [Notification.Type]: { type: String, required: true, enum: Object.values(NotificationTypes) },
  [Notification.MissingPoster]: {
    type: String,
    ref: CollectionNames.MissingPosters,
    required: true,
  },
});

notificationSchema.set('toObject', {
  virtuals: true,
});

notificationSchema.set('toJSON', {
  virtuals: true,
});

export default MongoHelper.getModel<NotificationDocument>(
  CollectionNames.Notifications,
  notificationSchema
);
