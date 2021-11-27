import { Router } from 'express';

import { adaptExpressRoute } from '../../../main/adapters/express-route-adapter';
import createCommentController from '../../factories/comment/create-comment';
import getAllCommentsController from '../../factories/comment/get-all-comments';

export default (router: Router) => {
  router.get('/', adaptExpressRoute(getAllCommentsController));

  router.post('/', adaptExpressRoute(createCommentController));

  return router;
};
