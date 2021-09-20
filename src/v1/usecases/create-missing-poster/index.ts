import { ApiErrorsName, ApiErrorsType, NotificationTypes } from '../../../constants';
import apiMessages from '../../../locales/pt/api-server.json';
import uow from '../../../main/external/repositories/mongodb/unit-of-work';
import CustomError from '../../../olyn/custom-error';
import { makeMissingPoster } from '../../entities/missing-poster';
import { IMissingPosterInput } from '../../entities/missing-poster/missing-poster.types';
import { makeNotification } from '../../entities/notification';

// eslint-disable-next-line import/prefer-default-export
export function createMissingPosterUC() {
  return async (data: IMissingPosterInput) => {
    const unitOfWork = await uow();
    try {
      await unitOfWork.startTransaction();

      const missingPosterRepo = unitOfWork.makeMissingPosterRepository();
      const notificationRepo = unitOfWork.makeNotificationRepository();

      const createdMissingPoster = await missingPosterRepo.add(makeMissingPoster(data));

      await notificationRepo.add(
        makeNotification({ missingPoster: createdMissingPoster.id, type: NotificationTypes.Create })
      );

      await unitOfWork.commitChanges();

      return {
        payload: createdMissingPoster,
      };
    } catch (error) {
      await unitOfWork.rollback();

      throw error instanceof CustomError
        ? error
        : new CustomError({
            statusCode: 422,
            name: ApiErrorsName.GenericName,
            type: ApiErrorsType.GenericType,
            message: apiMessages['E-1006'],
            i18nCode: 'E-1006',
            stack: error.stack,
            details: error,
          });
    }
  };
}
