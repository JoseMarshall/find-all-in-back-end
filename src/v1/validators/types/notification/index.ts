import { ServerConstants, TimeStamps } from '../../../../constants';
import { HttpRequest, Session } from '../../../../main/adapters/adapters.types';
import { GetAll } from '../sub-types';

type NotificationUpdatingFields =
  | {
      isDeleted: boolean;
      isRead?: never;
    }
  | {
      isDeleted?: never;
      isRead: boolean;
    };

export interface GetAllNotifications extends HttpRequest {
  query: GetAll & { [TimeStamps.UpdatedAt]?: string };
  [ServerConstants.Session]: Session;
}

export interface UpdateOneNotification extends HttpRequest {
  body: NotificationUpdatingFields;
  params: { id: string };
  [ServerConstants.Session]: Session;
}

export interface UpdateManyNotifications extends HttpRequest {
  body: NotificationUpdatingFields & { notifications: readonly string[] };
  params: {};
  [ServerConstants.Session]: Session;
}

export interface UpdateAllNotifications extends HttpRequest {
  body: NotificationUpdatingFields;
  params: {};
  [ServerConstants.Session]: Session;
}
