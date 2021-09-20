import { Notification, NotificationTypes } from '../../../constants';
import { Entity } from '../entity.types';

export interface INotification extends Entity {
  [Notification.Type]: `${NotificationTypes}`;
  [Notification.MissingPoster]: string;
}
