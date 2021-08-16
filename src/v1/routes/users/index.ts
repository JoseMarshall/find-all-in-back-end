import { Router } from 'express';

import { adaptExpressRoute } from '../../../main/adapters/express-route-adapter';
import makeCreateUserController from '../../factories/user/create-find-all-in-admin';

export default (router: Router) => {
  router.post('/', adaptExpressRoute(makeCreateUserController));

  return router;
};
