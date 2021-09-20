import makeGetAllEntityController from '../../controllers/get-all-entities';
import { INotification } from '../../entities/notification/notification.types';
import { getAllNotificationsUC } from '../../usecases/get-all-notifications';
import { makeGetAllNotificationsValidator } from '../../validators/schemas/http-requests/notification';
import { GetAllNotifications } from '../../validators/types/notification';

const getAllNotifications = makeGetAllEntityController<INotification, GetAllNotifications>({
  findAll: getAllNotificationsUC(),
  requestValidator: makeGetAllNotificationsValidator(),
});

export default getAllNotifications;
