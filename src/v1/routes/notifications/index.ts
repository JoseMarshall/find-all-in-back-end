import { Router } from 'express';

import { adaptExpressRoute } from '../../../main/adapters/express-route-adapter';
import { protect } from '../../../main/middleware';
import getAllNotificationsController from '../../factories/notification/get-all-notifications';
import updateAllNotificationsController from '../../factories/notification/update-all-notifications';
import updateManyNotificationsController from '../../factories/notification/update-many-notifications';
import updateOneNotificationController from '../../factories/notification/update-one-notification';

export default (router: Router) => {
  router.get(
    '/',
    protect({
      notAllowedRoles: [],
    }),
    adaptExpressRoute(getAllNotificationsController)
  );

  router.put(
    '/update-many',
    protect({
      notAllowedRoles: [],
    }),
    adaptExpressRoute(updateManyNotificationsController)
  );

  router.put(
    '/update-all',
    protect({
      notAllowedRoles: [],
    }),
    adaptExpressRoute(updateAllNotificationsController)
  );

  router.put(
    '/:id',
    protect({
      notAllowedRoles: [],
    }),
    adaptExpressRoute(updateOneNotificationController)
  );

  return router;
};
