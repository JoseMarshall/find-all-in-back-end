import { Router } from 'express';

import { UserRoles } from '../../../constants';
import { adaptExpressRoute } from '../../../main/adapters/express-route-adapter';
import { protect } from '../../../main/middleware';
import createMissingPosterController from '../../factories/missing-poster/create-missing-poster';
import getAllMissingPostersController from '../../factories/missing-poster/get-all-missing-posters';
import getOneMissingPosterController from '../../factories/missing-poster/get-one-missing-poster';

export default (router: Router) => {
  router.get(
    '/:id',
    protect({
      allowedRoles: [UserRoles.FindAllInAdmin, UserRoles.InstitutionEmployee, UserRoles.Citizen],
    }),
    adaptExpressRoute(getOneMissingPosterController)
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
