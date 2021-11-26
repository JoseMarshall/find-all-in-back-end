import { Router } from 'express';

import { UserRoles } from '../../../constants';
import { adaptExpressRoute } from '../../../main/adapters/express-route-adapter';
import { hashPassword, protect } from '../../../main/middleware';
import makeCreateUserController from '../../factories/user/create-find-all-in-admin';
import makeUpdateUserController from '../../factories/user/update-user';

export default (router: Router) => {
  router.put('/:id', protect({ notAllowedRoles: [] }), adaptExpressRoute(makeUpdateUserController));

  router.post(
    '/',
    protect({ allowedRoles: [UserRoles.FindAllInAdmin] }),
    hashPassword,
    adaptExpressRoute(makeCreateUserController)
  );

  return router;
};
