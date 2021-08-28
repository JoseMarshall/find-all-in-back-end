import { MissingPoster } from '../../../constants';
import { formatQueryToRange } from '../../../utils';
import makeGetAllEntityController from '../../controllers/get-all-entities';
import { IMissingPoster } from '../../entities/missing-poster/missing-poster.types';
import { getAllMissingPostersUC } from '../../usecases/get-all-missing-posters';
import { makeGetAllMissingPostersValidator } from '../../validators/schemas/http-requests/missing-poster';
import { GetAllMissingPosters } from '../../validators/types/missing-poster';

const getAllMissingPoster = makeGetAllEntityController<IMissingPoster, GetAllMissingPosters>({
  findAll: getAllMissingPostersUC(),
  requestValidator: makeGetAllMissingPostersValidator(),
  queryFormatter: (query: GetAllMissingPosters) => {
    const queryStatus =
      MissingPoster.Status in query
        ? { ...query, [MissingPoster.Status]: { $in: query.status?.split('|')! } }
        : query;

    return formatQueryToRange(queryStatus, [
      { name: MissingPoster.LastSeenDate, accuracy: 1, splitter: ' to ', dataType: 'date' },
    ]);
  },
});

export default getAllMissingPoster;
