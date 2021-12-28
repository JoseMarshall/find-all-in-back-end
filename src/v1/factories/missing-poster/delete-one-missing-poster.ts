import makeDeleteEntityController from '../../controllers/delete-entity';
import { IMissingPoster } from '../../entities/missing-poster/missing-poster.types';
import { deleteMissingPosterUC } from '../../usecases/delete-missing-poster';
import { makeDeleteOneMissingPosterValidator } from '../../validators/schemas/http-requests/missing-poster';
import { DeleteOnePoster } from '../../validators/types/missing-poster';

const deleteOneMissingPoster = makeDeleteEntityController<IMissingPoster, DeleteOnePoster>({
  deleteAll: deleteMissingPosterUC(),
  requestValidator: makeDeleteOneMissingPosterValidator(),
});

export default deleteOneMissingPoster;
