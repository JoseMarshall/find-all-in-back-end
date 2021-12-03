import { Router } from 'express';

import { adaptExpressRoute } from '../../../main/adapters/express-route-adapter';
import { protect } from '../../../main/middleware';
import createEmployee from '../../factories/employee/create-employee';
import deleteOneEmployee from '../../factories/employee/delete-one-employee';
import getAllEmployees from '../../factories/employee/get-all-employees';
import getOneEmployee from '../../factories/employee/get-one-employee';

export default (router: Router) => {
  router.get('/:id', protect({ notAllowedRoles: [] }), adaptExpressRoute(getOneEmployee));
  router.post('/', protect({ notAllowedRoles: [] }), adaptExpressRoute(createEmployee));
  router.get('/', protect({ notAllowedRoles: [] }), adaptExpressRoute(getAllEmployees));
  router.delete('/:id', protect({ notAllowedRoles: [] }), adaptExpressRoute(deleteOneEmployee));

  return router;
};
