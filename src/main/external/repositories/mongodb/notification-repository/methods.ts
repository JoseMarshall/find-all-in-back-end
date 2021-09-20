import { ClientSession } from 'mongoose';

import { CollectionNames, Common, UsersNotification } from '../../../../../constants';
import { safeParseInt } from '../../../../../utils';
import { INotification } from '../../../../../v1/entities/notification/notification.types';
import { GetAllNotifications } from '../../../../../v1/validators/types/notification';
import { generateLookUp, queryGuard } from '../helpers';
import { NotificationModel, UserNotificationModel } from '../models';
import { NotificationDocument } from '../models/model.types';
import { GetAllEntitiesAggregatedData, MakeGetAllEntitiesDependencies } from '../mongoose.types';
import {
  UpdateAllNotifications,
  UpdateManyNotifications,
  UpdateOneNotification,
} from './notification-repository.types';

export function makeCreateNotification(transaction?: ClientSession) {
  return async (notification: INotification) => {
    const result = await queryGuard<NotificationDocument[]>(
      NotificationModel.create([notification], {
        session: transaction?.id ? transaction : undefined,
      })
    );

    return result[0] as INotification;
  };
}

export function makeGetAllNotifications(options: MakeGetAllEntitiesDependencies<INotification>) {
  return async ({ query, __session: userSession }: GetAllNotifications) => {
    const { page, limit, sortBy, ...filteredQuery } = query;

    const pageNumber = safeParseInt(page, 10);
    const docPerPage = safeParseInt(limit ?? '0', 10);
    const skip = docPerPage > 0 ? docPerPage * (pageNumber - 1) : 0;

    const formattedQuery = options.formatQuery ? options.formatQuery(filteredQuery) : filteredQuery;

    const userNotificationLookup = generateLookUp([
      {
        from: CollectionNames.UsersNotifications,
        alias: 'userNotification',
        foreignField: 'userNotification',
        isForeignFieldArray: false,
        matchExp: {
          $and: [
            {
              // $$$foreign_id refers to the lookup variable name which stores the value of the notification id
              $eq: [`$${UsersNotification.Notification}`, '$$$foreign_id'],
            },
            {
              $eq: [`$${UsersNotification.UserId}`, userSession.user.id],
            },
          ],
        },
      },
    ]);

    const document = await queryGuard<GetAllEntitiesAggregatedData<NotificationDocument>[]>(
      NotificationModel.aggregate([
        {
          $facet: {
            entitiesPage: [
              {
                $addFields: {
                  userNotification: '$id',
                },
              },
              ...userNotificationLookup,
              ...(options.lookup ?? []),
              {
                $addFields: {
                  isRead: {
                    $ifNull: ['$userNotification.isRead', false],
                  },
                },
              },
              {
                $match: {
                  $or: [
                    {
                      'userNotification.isDeleted': false,
                      'userNotification.userId': userSession.user.id,
                    },
                    {
                      userNotification: null,
                    },
                  ],
                  ...formattedQuery,
                },
              },

              { $sort: JSON.parse(sortBy || `{"updatedAt":-1}`) },
              { $skip: skip },
              { $limit: docPerPage || 15 },
              {
                $project: {
                  ...(options.projection ?? { _id: 0, userNotification: 0 }),
                },
              },
            ],
            totalCount: [
              {
                $addFields: {
                  userNotification: '$id',
                },
              },
              ...userNotificationLookup,

              {
                $match: {
                  $or: [
                    {
                      'userNotification.isDeleted': false,
                      'userNotification.userEmail': userSession.user.id,
                    },
                    {
                      userNotification: null,
                    },
                  ],
                  'userNotification.isRead': { $ne: true },
                },
              },
              { $count: 'total' },
            ],
          },
        },
      ]).exec()
    );

    return {
      data: options.formatData
        ? options.formatData(document[0].data)
        : (document[0].data as unknown as INotification[]),
      count: document[0].count[0]?.total ?? 0,
    };
  };
}

export function makeUpdateOneNotification(transaction?: ClientSession) {
  return async ({ body, notificationId, userId }: UpdateOneNotification) => {
    await queryGuard(
      UserNotificationModel.updateOne(
        {
          [UsersNotification.Notification]: notificationId,
          [UsersNotification.UserId]: userId,
        },
        {
          isDeleted: false,
          ...body,
          [UsersNotification.Notification]: notificationId,
          [UsersNotification.UserId]: userId,
        },
        {
          upsert: true,
          session: transaction?.id ? transaction : undefined,
        }
      ).lean()
    );
    return { updated: true };
  };
}

export function makeUpdateManyNotifications(transaction?: ClientSession) {
  return async ({ body, userId }: UpdateManyNotifications) => {
    const { notifications, ...filteredBody } = body;
    await Promise.all(
      notifications.flatMap((notification: string) => [
        UserNotificationModel.updateMany(
          {
            [UsersNotification.UserId]: userId,
            notification,
          },
          {
            isDeleted: false,
            ...filteredBody,
            [UsersNotification.UserId]: userId,
            notification,
          },
          {
            upsert: true,
            session: transaction?.id ? transaction : undefined,
          }
        ).lean(),
      ])
    );

    return { updated: true };
  };
}

export function makeUpdateAllNotifications(transaction?: ClientSession) {
  return async ({ body, userId }: UpdateAllNotifications) => {
    // Fetch all existing notifications, and take all its Id
    const notifications: string[] = (
      await queryGuard<NotificationDocument[]>(
        NotificationModel.find({}, { [Common.Id]: 1 }).lean()
      )
    ).map((x: NotificationDocument) => x.id);

    await Promise.all(
      notifications.flatMap((notification: string) => [
        UserNotificationModel.updateMany(
          {
            [UsersNotification.UserId]: userId,
            notification,
          },
          {
            isDeleted: false,
            ...body,
            [UsersNotification.UserId]: userId,
            notification,
          },
          {
            upsert: true,
            session: transaction?.id ? transaction : undefined,
          }
        ).lean(),
      ])
    );

    return { updated: true };
  };
}
