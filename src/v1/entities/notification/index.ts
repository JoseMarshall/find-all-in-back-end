import { v4 as uuid } from 'uuid';

import { Common, Notification, TimeStamps } from '../../../constants';
import { INotification } from './notification.types';

// eslint-disable-next-line import/prefer-default-export
export const makeNotification = (
  data: Pick<INotification, Notification.Type | Notification.MissingPoster>,
  id?: string
) => ({
  [Common.Id]: id ?? uuid(),
  ...data,
  [Common.IsDeleted]: false,
  [TimeStamps.CreatedAt]: new Date(),
  [TimeStamps.UpdatedAt]: new Date(),
});
