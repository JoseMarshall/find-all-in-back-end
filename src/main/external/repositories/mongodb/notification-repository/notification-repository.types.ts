type NotificationUpdatingFields =
  | {
      isDeleted: boolean;
      isRead?: never;
    }
  | {
      isDeleted?: never;
      isRead: boolean;
    };

export interface UpdateOneNotification {
  userId: string;
  notificationId: string;
  body: NotificationUpdatingFields;
}

export interface UpdateManyNotifications {
  userId: string;
  body: NotificationUpdatingFields & { notifications: readonly string[] };
}

export interface UpdateAllNotifications {
  userId: string;
  body: NotificationUpdatingFields;
}
