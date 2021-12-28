import makeUpdateEntityController from '../../controllers/update-entity';
import { IMissingPoster } from '../../entities/missing-poster/missing-poster.types';
import { approveMissingPosterUC } from '../../usecases/approve-missing-poster';
import { makeApproveMissingPosterValidator } from '../../validators/schemas/http-requests/missing-poster';
import { GetOne } from '../../validators/types/sub-types';

const approveMissingPoster = makeUpdateEntityController<IMissingPoster, GetOne>({
  update: approveMissingPosterUC(),
  requestValidator: makeApproveMissingPosterValidator(),
});

export default approveMissingPoster;
