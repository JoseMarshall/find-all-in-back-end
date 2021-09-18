import makeGetEntityGroupedController from '../../controllers/get-entity-grouped';
import { GroupedBy } from '../../entities/entity.types';
import { getMissingPostersGroupedByStatusUC } from '../../usecases/get-missing-posters-grouped-by-status';
import { makeGetMissingPosterGroupedByStatusValidator } from '../../validators/schemas/http-requests/missing-poster';

const getMissingPosterGroupedByStatus = makeGetEntityGroupedController<GroupedBy<string>, {}>({
  groupBy: getMissingPostersGroupedByStatusUC(),
  requestValidator: makeGetMissingPosterGroupedByStatusValidator(),
});

export default getMissingPosterGroupedByStatus;
