import { TimeStamps } from '../../../../constants';
import { HttpRequest } from '../../../../main/adapters/adapters.types';
import { GetAll } from '../sub-types';

export interface GetAllNotifications extends GetAll {
  [TimeStamps.UpdatedAt]?: string;
}

export interface UpdateOneNotification extends HttpRequest {
  body: {
    isRead?: boolean;
    isDeleted?: boolean;
  };
  params: { id: string };
}

export interface UpdateManyNotifications extends HttpRequest {
  body: { isRead?: boolean; isDeleted?: boolean; notifications: string[] };
  params: {};
}

export interface UpdateAllNotifications extends HttpRequest {
  body: { isRead?: boolean; isDeleted?: boolean };
  params: {};
}
