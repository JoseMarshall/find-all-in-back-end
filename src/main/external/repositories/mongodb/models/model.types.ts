import { Document } from 'mongoose';

import {
  Citizen,
  Comment,
  Common,
  MissingPoster,
  MissingPosterStatus,
  Notification,
  NotificationTypes,
  TotalCountCollection,
  User,
  UsersNotification,
} from '../../../../../constants';
import { Entity } from '../../../../../v1/entities/entity.types';

export interface UserDocument extends Document, Omit<Entity, Common.Id> {
  [User.Name]: string;
  [User.Email]: string;
  [User.Password]: string;
  [User.Username]: string;
  [User.Role]: string;
  [MissingPoster.CreatedBy]: string;
}

export interface MissingPosterDocument extends Document, Omit<Entity, Common.Id> {
  [MissingPoster.Name]: string;
  [MissingPoster.Status]: `${MissingPosterStatus}`;
  [MissingPoster.LastSeenDate]: string;
  [MissingPoster.LastSeenAt]: string;
  [MissingPoster.Photo]: string;
  [MissingPoster.CreatedBy]: string;
  [MissingPoster.UpdatedBy]: string;
}

export interface NotificationDocument extends Document, Omit<Entity, Common.Id> {
  [Notification.Type]: `${NotificationTypes}`;
  [Notification.MissingPoster]: string;
}

export interface UserNotificationDocument extends Document, Omit<Entity, Common.Id> {
  [UsersNotification.UserId]: string;
  [UsersNotification.Notification]: string;
  [UsersNotification.IsRead]: boolean;
}
export interface TotalCollectionsDocument extends Document, Omit<Entity, Common.Id> {
  [TotalCountCollection.CollectionName]: string;
  [TotalCountCollection.TotalCount]: number;
}

export interface CitizenDocument extends Document, Omit<Entity, Common.Id> {
  [Citizen.Name]: string;
  [Citizen.UserAccount]: string;
}

export interface CommentDocument extends Document, Omit<Entity, Common.Id> {
  [Comment.MissingPoster]: string;
  [Comment.PostedBy]: string;
  [Comment.Text]: string;
}
