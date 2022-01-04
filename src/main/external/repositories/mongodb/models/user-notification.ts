import { Schema } from 'mongoose';

import { CollectionNames, Common, UsersNotification } from '../../../../../constants';
import { MongoHelper } from '../helpers/mongo-helper';
import { UserNotificationDocument } from './model.types';

const userNotificationSchema = new Schema<any, any>(
  {
    [Common.IsDeleted]: { type: Boolean, default: false },
    [UsersNotification.UserId]: { type: String, required: true },
    [UsersNotification.IsRead]: { type: Boolean, required: true, default: true },
    [UsersNotification.Notification]: {
      type: String,
      ref: CollectionNames.UsersNotifications,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

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
