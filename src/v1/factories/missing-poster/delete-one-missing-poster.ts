import { DeletedEntity } from '../../../main/external/repositories/repository.types';
import makeDeleteEntityController from '../../controllers/delete-entity';
import { deleteMissingPosterUC } from '../../usecases/delete-missing-poster';
import { makeDeleteOneMissingPosterValidator } from '../../validators/schemas/http-requests/missing-poster';
import { GetOne } from '../../validators/types/sub-types';

const deleteOneMissingPoster = makeDeleteEntityController<DeletedEntity, GetOne>({
  deleteAll: deleteMissingPosterUC(),
  requestValidator: makeDeleteOneMissingPosterValidator(),
});

export default deleteOneMissingPoster;
