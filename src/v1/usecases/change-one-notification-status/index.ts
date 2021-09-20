import { ApiErrorsName, ApiErrorsType } from '../../../constants';
import apiMessages from '../../../locales/pt/api-server.json';
import uow from '../../../main/external/repositories/mongodb/unit-of-work';
import CustomError from '../../../olyn/custom-error';
import { UpdateOneNotification } from '../../validators/types/notification';

// eslint-disable-next-line import/prefer-default-export
export function changeOneNotificationStatusUC() {
  return async ({ body, __session, params }: UpdateOneNotification) => {
    const unitOfWork = await uow();
    try {
      const notificationRepo = unitOfWork.makeNotificationRepository();

      const result = await notificationRepo.updateOne({
        body,
        userId: __session.user.id,
        notificationId: params.id,
      });

      return {
        payload: result,
      };
    } catch (error) {
      throw error instanceof CustomError
        ? error
        : new CustomError({
            statusCode: 422,
            name: ApiErrorsName.GenericName,
            type: ApiErrorsType.GenericType,
            message: apiMessages['E-1004'],
            i18nCode: 'E-1004',
            stack: error.stack,
            details: error,
          });
    }
  };
}
