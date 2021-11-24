import makeUpdateEntityController from '../../controllers/update-entity';
import { IMissingPoster } from '../../entities/missing-poster/missing-poster.types';
import { likeMissingPosterUC } from '../../usecases/like-missing-poster';
import { makeLikeMissingPosterValidator } from '../../validators/schemas/http-requests/missing-poster';
import { UpdateLikesPoster } from '../../validators/types/missing-poster';

const likeMissingPoster = makeUpdateEntityController<IMissingPoster, UpdateLikesPoster>({
  update: likeMissingPosterUC(),
  requestValidator: makeLikeMissingPosterValidator(),
});

export default likeMissingPoster;
