import makeCreateEntityController from '../../controllers/create-entity';
import {
  IMissingPoster,
  IMissingPosterInput,
} from '../../entities/missing-poster/missing-poster.types';
import { createMissingPosterUC } from '../../usecases/create-missing-poster';
import { makeCreateMissingPosterValidator } from '../../validators/schemas/http-requests/missing-poster';

const createMissingPoster = makeCreateEntityController<IMissingPoster, IMissingPosterInput>({
  create: createMissingPosterUC(),
  requestValidator: makeCreateMissingPosterValidator(),
});

export default createMissingPoster;
