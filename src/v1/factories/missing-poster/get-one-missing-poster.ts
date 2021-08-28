import makeGetOneEntityController from '../../controllers/get-one-entity';
import { IMissingPoster } from '../../entities/missing-poster/missing-poster.types';
import { getDetailedMissingPosterUC } from '../../usecases/get-detailed-missing-poster';
import { makeGetOneMissingPosterValidator } from '../../validators/schemas/http-requests/missing-poster';
import { GetOne } from '../../validators/types/sub-types';

const getOneMissingPoster = makeGetOneEntityController<IMissingPoster, GetOne>({
  findOne: getDetailedMissingPosterUC(),
  requestValidator: makeGetOneMissingPosterValidator(),
});

export default getOneMissingPoster;
