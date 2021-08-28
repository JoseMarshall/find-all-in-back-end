import { MissingPoster, ServerConstants } from '../../../../../constants';
import { ExpressRequestSession, HttpRequest } from '../../../../../main/adapters/adapters.types';
import createMissingPosterSchemaValidator from './create-missing-poster-schema';
import getAllMissingPostersSchemaValidator from './get-all-missing-posters-schema';
import getOneMissingPosterSchemaValidator from './get-one-missing-poster-schema';

// eslint-disable-next-line import/prefer-default-export
export const makeCreateMissingPosterValidator = () => async (req: ExpressRequestSession) =>
  createMissingPosterSchemaValidator({
    ...req.body,
    [MissingPoster.CreatedBy]: req[ServerConstants.Session].user.id,
  });

export const makeGetOneMissingPosterValidator = () => async (req: HttpRequest) =>
  getOneMissingPosterSchemaValidator(req.params);

export const makeGetAllMissingPostersValidator = () => async (req: HttpRequest) =>
  getAllMissingPostersSchemaValidator(req.query);
