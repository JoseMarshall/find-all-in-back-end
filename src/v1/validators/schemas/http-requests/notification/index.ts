import { HttpRequest } from '../../../../../main/adapters/adapters.types';
import getAllUsersSchemaValidator from './get-all-notifications-schema';
import updateAllNotificationsSchemaValidator from './update-all-notifications-schema';
import updateManyNotificationsSchemaValidator from './update-many-notifications-schema';
import updateOneNotificationSchemaValidator from './update-one-notification-schema';

export const makeUpdateOneNotificationValidator = () => async (req: HttpRequest) =>
  updateOneNotificationSchemaValidator(req);

export const makeUpdateManyNotificationsValidator = () => async (req: HttpRequest) =>
  updateManyNotificationsSchemaValidator(req);

export const makeGetAllNotificationsValidator = () => async (req: HttpRequest) =>
  getAllUsersSchemaValidator(req.query);

export const makeUpdateAllNotificationsValidator = () => async (req: HttpRequest) =>
  updateAllNotificationsSchemaValidator(req);
