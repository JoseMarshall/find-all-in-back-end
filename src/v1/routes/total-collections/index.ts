import { Router } from 'express';

import { UserRoles } from '../../../constants';
import { adaptExpressRoute } from '../../../main/adapters/express-route-adapter';
import { protect } from '../../../main/middleware';
import getAllTotalCollectionsController from '../../factories/total-collection/get-all-total-collections';

export default (router: Router) => {
  router.get(
    '/',
    protect({
      allowedRoles: [UserRoles.FindAllInAdmin, UserRoles.InstitutionAdmin],
    }),
    adaptExpressRoute(getAllTotalCollectionsController)
  );

  return router;
};
