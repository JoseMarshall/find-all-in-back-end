import makeGetEntityGroupedController from '../../controllers/get-entity-grouped';
import {
  DataGroupedByCountyAccumulator,
  getMissingPostersGroupedByCountyUC,
} from '../../usecases/get-missing-posters-grouped-by-county';
import { makeGetMissingPosterGroupedByCountyValidator } from '../../validators/schemas/http-requests/missing-poster';

const getMissingPosterGroupedByCounty = makeGetEntityGroupedController<
  DataGroupedByCountyAccumulator,
  {}
>({
  groupBy: getMissingPostersGroupedByCountyUC(),
  requestValidator: makeGetMissingPosterGroupedByCountyValidator(),
});

export default getMissingPosterGroupedByCounty;
