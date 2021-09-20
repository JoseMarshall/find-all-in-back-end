import makeUpdateEntityController from '../../controllers/update-entity';
import { changeOneNotificationStatusUC } from '../../usecases/change-one-notification-status';
import { makeUpdateOneNotificationValidator } from '../../validators/schemas/http-requests/notification';
import { UpdateOneNotification } from '../../validators/types/notification';

const updateOneNotification = makeUpdateEntityController<
  { updated: boolean },
  UpdateOneNotification
>({
  update: changeOneNotificationStatusUC(),
  requestValidator: makeUpdateOneNotificationValidator(),
});

export default updateOneNotification;
