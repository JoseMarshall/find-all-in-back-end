import { ServerConstants, TimeStamps } from '../../../../constants';
import { HttpRequest, Session } from '../../../../main/adapters/adapters.types';
import { GetAll } from '../sub-types';

export interface GetAllNotifications extends HttpRequest {
  query: GetAll & { [TimeStamps.UpdatedAt]?: string };
  [ServerConstants.Session]: Session;
}

export interface UpdateOneNotification extends HttpRequest {
  body: {
    isRead?: boolean;
    isDeleted?: boolean;
  };
  params: { id: string };
  [ServerConstants.Session]: Session;
}

export interface UpdateManyNotifications extends HttpRequest {
  body: { isRead?: boolean; isDeleted?: boolean; notifications: string[] };
  params: {};
  [ServerConstants.Session]: Session;
}

export interface UpdateAllNotifications extends HttpRequest {
  body: { isRead?: boolean; isDeleted?: boolean };
  params: {};
  [ServerConstants.Session]: Session;
}
