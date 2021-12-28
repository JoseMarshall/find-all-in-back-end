import { Router } from 'express';

import { adaptExpressRoute } from '../../../main/adapters/express-route-adapter';
import { protect } from '../../../main/middleware';
import createCommentController from '../../factories/comment/create-comment';
import getAllCommentsController from '../../factories/comment/get-all-comments';

export default (router: Router) => {
  router.get('/', adaptExpressRoute(getAllCommentsController));

  router.post('/', protect({ notAllowedRoles: [] }), adaptExpressRoute(createCommentController));

  return router;
};
