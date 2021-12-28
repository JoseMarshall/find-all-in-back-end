import makeUpdateEntityController from '../../controllers/update-entity';
import { IMissingPoster } from '../../entities/missing-poster/missing-poster.types';
import { denyMissingPosterUC } from '../../usecases/deny-missing-poster';
import { makeDenyMissingPosterValidator } from '../../validators/schemas/http-requests/missing-poster';
import { GetOne } from '../../validators/types/sub-types';

const denyMissingPoster = makeUpdateEntityController<IMissingPoster, GetOne>({
  update: denyMissingPosterUC(),
  requestValidator: makeDenyMissingPosterValidator(),
});

export default denyMissingPoster;
