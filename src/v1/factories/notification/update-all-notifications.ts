import makeUpdateEntityController from '../../controllers/update-entity';
import { changeAllNotificationsStatusUC } from '../../usecases/change-all-notifications-status';
import { makeUpdateAllNotificationsValidator } from '../../validators/schemas/http-requests/notification';
import { UpdateAllNotifications } from '../../validators/types/notification';

const updateAllNotification = makeUpdateEntityController<
  { updated: boolean },
  UpdateAllNotifications
>({
  update: changeAllNotificationsStatusUC(),
  requestValidator: makeUpdateAllNotificationsValidator(),
});

export default updateAllNotification;
