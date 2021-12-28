import {
  ApiErrorsName,
  ApiErrorsType,
  CollectionNames,
  Notification,
  NotificationTypes,
} from '../../../constants';
import apiMessages from '../../../locales/pt/api-server.json';
import { io } from '../../../main/config/app';
import uow from '../../../main/external/repositories/mongodb/unit-of-work';
import CustomError from '../../../olyn/custom-error';
import { makeNotification } from '../../entities/notification';
import { DeleteOnePoster } from '../../validators/types/missing-poster';

// eslint-disable-next-line import/prefer-default-export
export function deleteMissingPosterUC() {
  return async ({ params, body }: DeleteOnePoster) => {
    const unitOfWork = await uow();
    try {
      const missingPosterRepo = unitOfWork.makeMissingPosterRepository();
      const notificationRepo = unitOfWork.makeNotificationRepository();

      const missingPoster = await missingPosterRepo.update(params, { ...body, isDeleted: true });

      const notification = await notificationRepo.add(
        makeNotification({ missingPoster: missingPoster.id, type: NotificationTypes.Deleted })
      );

      // Emit the created missing-poster event through websocket
      io.emit(
        `${CollectionNames.MissingPosters}-${NotificationTypes.Deleted}`,
        JSON.stringify({
          id: notification.id,
          createdAt: notification.createdAt,
          isDeleted: notification.isDeleted,
          updatedAt: notification.updatedAt,
          [Notification.MissingPoster]: missingPoster,
          [Notification.Type]: NotificationTypes.Create,
          isRead: false,
        })
      );

      return {
        payload: missingPoster,
      };
    } catch (error) {
      throw error instanceof CustomError
        ? error
        : new CustomError({
            statusCode: 404,
            name: ApiErrorsName.GenericName,
            type: ApiErrorsType.GenericType,
            message: apiMessages['E-1007'],
            i18nCode: 'E-1007',
            stack: error.stack,
            details: error,
          });
    }
  };
}
