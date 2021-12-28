import { Router } from 'express';

import { UserRoles } from '../../../constants';
import { adaptExpressRoute } from '../../../main/adapters/express-route-adapter';
import { protect } from '../../../main/middleware';
import approveMissingPosterController from '../../factories/missing-poster/approve-missing-poster';
import createMissingPosterController from '../../factories/missing-poster/create-missing-poster';
import deleteOneMissingPosterController from '../../factories/missing-poster/delete-one-missing-poster';
import denyMissingPosterController from '../../factories/missing-poster/deny-missing-poster';
import getAllMissingPostersController from '../../factories/missing-poster/get-all-missing-posters';
import getOneMissingPosterGroupedByCountyController from '../../factories/missing-poster/get-missing-poster-grouped-by-county';
import getOneMissingPosterGroupedByStatusController from '../../factories/missing-poster/get-missing-poster-grouped-by-status';
import getOneMissingPosterController from '../../factories/missing-poster/get-one-missing-poster';
import likeMissingPosterController from '../../factories/missing-poster/like-missing-poster';

export default (router: Router) => {
  router.get('/group-by-status', adaptExpressRoute(getOneMissingPosterGroupedByStatusController));

  router.get('/group-by-county', adaptExpressRoute(getOneMissingPosterGroupedByCountyController));

  router.get(
    '/:id/approve',
    protect({
      allowedRoles: [UserRoles.FindAllInAdmin, UserRoles.InstitutionAdmin],
    }),
    adaptExpressRoute(approveMissingPosterController)
  );

  router.get(
    '/:id/deny',
    protect({
      allowedRoles: [UserRoles.FindAllInAdmin, UserRoles.InstitutionAdmin],
    }),
    adaptExpressRoute(denyMissingPosterController)
  );

  router.get('/:id', adaptExpressRoute(getOneMissingPosterController));

  router.delete(
    '/:id',
    protect({
      notAllowedRoles: [],
    }),
    adaptExpressRoute(deleteOneMissingPosterController)
  );

  router.put(
    '/:id/like-dislike',
    protect({
      notAllowedRoles: [],
    }),
    adaptExpressRoute(likeMissingPosterController)
  );

  router.get('/', adaptExpressRoute(getAllMissingPostersController));

  router.post(
    '/',
    protect({
      allowedRoles: [UserRoles.FindAllInAdmin, UserRoles.InstitutionEmployee, UserRoles.Citizen],
    }),
    adaptExpressRoute(createMissingPosterController)
  );

  return router;
};
