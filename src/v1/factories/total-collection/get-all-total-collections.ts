import { TotalCountCollection } from '../../../constants';
import makeGetAllEntityController from '../../controllers/get-all-entities';
import { ITotalCollection } from '../../entities/total-collection/total-collection.types';
import { getAllTotalCollectionsUC } from '../../usecases/get-all-total-collections';
import { makeGetAllTotalCollectionValidator } from '../../validators/schemas/http-requests/total-collection';
import { GetAllTotalCollections } from '../../validators/types/total-collections';

const getAllTotalCollections = makeGetAllEntityController<ITotalCollection, GetAllTotalCollections>(
  {
    findAll: getAllTotalCollectionsUC(),
    requestValidator: makeGetAllTotalCollectionValidator(),
    queryFormatter: (query: GetAllTotalCollections) =>
      TotalCountCollection.CollectionName in query
        ? {
            ...query,
            [TotalCountCollection.CollectionName]: {
              $in: (query.collectionName as string)?.split('|')!,
            },
          }
        : query,
  }
);

export default getAllTotalCollections;
