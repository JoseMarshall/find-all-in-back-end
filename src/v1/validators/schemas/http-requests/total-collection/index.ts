import { HttpRequest } from '../../../../../main/adapters/adapters.types';
import getAllTotalCollectionSchemaValidator from './get-all-total-collection-schema';

// eslint-disable-next-line import/prefer-default-export
export const makeGetAllTotalCollectionValidator = () => async (req: HttpRequest) =>
  getAllTotalCollectionSchemaValidator(req.query);
