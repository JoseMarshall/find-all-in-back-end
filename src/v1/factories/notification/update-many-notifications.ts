import makeUpdateEntityController from '../../controllers/update-entity';
import { changeManyNotificationsStatusUC } from '../../usecases/change-many-notifications-status';
import { makeUpdateManyNotificationsValidator } from '../../validators/schemas/http-requests/notification';
import { UpdateManyNotifications } from '../../validators/types/notification';

const updateManyNotification = makeUpdateEntityController<
  { updated: boolean },
  UpdateManyNotifications
>({
  update: changeManyNotificationsStatusUC(),
  requestValidator: makeUpdateManyNotificationsValidator(),
});

export default updateManyNotification;
