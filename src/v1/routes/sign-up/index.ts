import { Router } from 'express';

import { adaptExpressRoute } from '../../../main/adapters/express-route-adapter';
import { hashPassword } from '../../../main/middleware';
import makeCitizenSignupController from '../../factories/citizen/signup';

export default (router: Router) => {
  router.post('/', hashPassword, adaptExpressRoute(makeCitizenSignupController));

  return router;
};
