import { Router } from 'express';

import { UserRoles } from '../../../constants';
import { adaptExpressRoute } from '../../../main/adapters/express-route-adapter';
import { protect } from '../../../main/middleware';
import makeCreateUserController from '../../factories/user/create-find-all-in-admin';

export default (router: Router) => {
  router.post(
    '/',
    protect({ allowedRoles: [UserRoles.FindAllInAdmin] }),
    adaptExpressRoute(makeCreateUserController)
  );

  return router;
};
