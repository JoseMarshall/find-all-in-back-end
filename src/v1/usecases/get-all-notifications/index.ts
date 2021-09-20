import {
  ApiErrorsName,
  ApiErrorsType,
  CollectionNames,
  MissingPoster,
  Notification,
  User,
} from '../../../constants';
import apiMessages from '../../../locales/pt/api-server.json';
import { generateLookUp } from '../../../main/external/repositories/mongodb/helpers';
import uow from '../../../main/external/repositories/mongodb/unit-of-work';
import CustomError from '../../../olyn/custom-error';
import { formatQueryToRegex } from '../../../utils';
import { GetAllNotifications } from '../../validators/types/notification';

// eslint-disable-next-line import/prefer-default-export
export function getAllNotificationsUC() {
  return async (req: GetAllNotifications) => {
    const unitOfWork = await uow();
    try {
      const notificationRepo = unitOfWork.makeNotificationRepository();

      const notifications = await notificationRepo.getAll(req, {
        lookup: generateLookUp([
          {
            foreignField: Notification.MissingPoster,
            from: CollectionNames.MissingPosters,
            isForeignFieldArray: false,
          },
          {
            from: CollectionNames.Users,
            foreignField: `${Notification.MissingPoster}.${MissingPoster.CreatedBy}`,
            isForeignFieldArray: false,
            select: {
              [User.Name]: 1,
              [User.Role]: 1,
            },
          },
          {
            from: CollectionNames.Users,
            foreignField: `${Notification.MissingPoster}.${MissingPoster.UpdatedBy}`,
            isForeignFieldArray: false,
            select: {
              [User.Name]: 1,
            },
          },
        ]),
        formatQuery: formatQueryToRegex,
      });

      return {
        payload: notifications,
      };
    } catch (error) {
      throw error instanceof CustomError
        ? error
        : new CustomError({
            statusCode: 404,
            name: ApiErrorsName.GenericName,
            type: ApiErrorsType.GenericType,
            message: apiMessages['E-1008'],
            i18nCode: 'E-1008',
            stack: error.stack,
            details: error,
          });
    }
  };
}
