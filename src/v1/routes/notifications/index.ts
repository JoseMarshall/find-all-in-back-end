import { Router } from 'express';

import { UserRoles } from '../../../constants';
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
      allowedRoles: [
        UserRoles.FindAllInAdmin,
        UserRoles.InstitutionAdmin,
        UserRoles.InstitutionEmployee,
      ],
    }),
    adaptExpressRoute(getAllNotificationsController)
  );

  router.put(
    '/update-many',
    protect({
      allowedRoles: [
        UserRoles.FindAllInAdmin,
        UserRoles.InstitutionAdmin,
        UserRoles.InstitutionEmployee,
      ],
    }),
    adaptExpressRoute(updateManyNotificationsController)
  );

  router.put(
    '/update-all',
    protect({
      allowedRoles: [
        UserRoles.FindAllInAdmin,
        UserRoles.InstitutionAdmin,
        UserRoles.InstitutionEmployee,
      ],
    }),
    adaptExpressRoute(updateAllNotificationsController)
  );

  router.put(
    '/:id',
    protect({
      allowedRoles: [
        UserRoles.FindAllInAdmin,
        UserRoles.InstitutionAdmin,
        UserRoles.InstitutionEmployee,
      ],
    }),
    adaptExpressRoute(updateOneNotificationController)
  );

  return router;
};
