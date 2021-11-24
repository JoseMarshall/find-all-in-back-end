import { Router } from 'express';

import { UserRoles } from '../../../constants';
import { adaptExpressRoute } from '../../../main/adapters/express-route-adapter';
import { protect } from '../../../main/middleware';
import createMissingPosterController from '../../factories/missing-poster/create-missing-poster';
import getAllMissingPostersController from '../../factories/missing-poster/get-all-missing-posters';
import getOneMissingPosterGroupedByCountyController from '../../factories/missing-poster/get-missing-poster-grouped-by-county';
import getOneMissingPosterGroupedByStatusController from '../../factories/missing-poster/get-missing-poster-grouped-by-status';
import getOneMissingPosterController from '../../factories/missing-poster/get-one-missing-poster';
import likeMissingPosterController from '../../factories/missing-poster/like-missing-poster';

export default (router: Router) => {
  router.get(
    '/group-by-status',
    protect({
      allowedRoles: [UserRoles.FindAllInAdmin, UserRoles.InstitutionEmployee, UserRoles.Citizen],
    }),
    adaptExpressRoute(getOneMissingPosterGroupedByStatusController)
  );

  router.get(
    '/group-by-county',
    protect({
      allowedRoles: [UserRoles.FindAllInAdmin, UserRoles.InstitutionEmployee, UserRoles.Citizen],
    }),
    adaptExpressRoute(getOneMissingPosterGroupedByCountyController)
  );

  router.get(
    '/:id',
    protect({
      allowedRoles: [UserRoles.FindAllInAdmin, UserRoles.InstitutionEmployee, UserRoles.Citizen],
    }),
    adaptExpressRoute(getOneMissingPosterController)
  );

  router.put(
    '/:id/like-dislike',
    protect({
      notAllowedRoles: [],
    }),
    adaptExpressRoute(likeMissingPosterController)
  );

  router.get(
    '/',
    protect({
      allowedRoles: [UserRoles.FindAllInAdmin, UserRoles.InstitutionEmployee, UserRoles.Citizen],
    }),
    adaptExpressRoute(getAllMissingPostersController)
  );

  router.post(
    '/',
    protect({
      allowedRoles: [UserRoles.FindAllInAdmin, UserRoles.InstitutionEmployee, UserRoles.Citizen],
    }),
    adaptExpressRoute(createMissingPosterController)
  );

  return router;
};
