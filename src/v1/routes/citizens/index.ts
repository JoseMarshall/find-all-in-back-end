import { Router } from 'express';

import { UserRoles } from '../../../constants';
import { adaptExpressRoute } from '../../../main/adapters/express-route-adapter';
import { protect } from '../../../main/middleware';
import controller from '../../factories/citizen/get-one-citizen';

export default (router: Router) => {
  router.get(
    '/:id',
    protect({ allowedRoles: [UserRoles.FindAllInAdmin] }),
    adaptExpressRoute(controller)
  );

  return router;
};
