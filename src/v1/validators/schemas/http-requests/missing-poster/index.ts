import {
  MissingPoster,
  MissingPosterApprovalStatus,
  ServerConstants,
  UserRoles,
} from '../../../../../constants';
import { ExpressRequestSession, HttpRequest } from '../../../../../main/adapters/adapters.types';
import approveMissingPosterSchemaValidator from './approve-missing-poster-schema';
import createMissingPosterSchemaValidator from './create-missing-poster-schema';
import deleteOneMissingPosterSchemaValidator from './delete-one-missing-poster-schema';
import denyMissingPosterSchemaValidator from './deny-missing-poster-schema';
import getAllMissingPostersSchemaValidator from './get-all-missing-posters-schema';
import getMissingPosterGroupedByCountySchemaValidator from './get-missing-poster-grouped-by-county-schema';
import getMissingPosterGroupedByStatusSchemaValidator from './get-missing-poster-grouped-by-status-schema';
import getOneMissingPosterSchemaValidator from './get-one-missing-poster-schema';
import likeMissingPosterSchemaValidator from './like-missing-poster-schema';

// eslint-disable-next-line import/prefer-default-export
export const makeCreateMissingPosterValidator = () => async (req: ExpressRequestSession) =>
  createMissingPosterSchemaValidator({
    ...req.body,
    [MissingPoster.CreatedBy]: req[ServerConstants.Session].user.id,
  });

export const makeLikeMissingPosterValidator = () => async (req: HttpRequest) =>
  likeMissingPosterSchemaValidator(req);

export const makeGetOneMissingPosterValidator = () => async (req: HttpRequest) =>
  getOneMissingPosterSchemaValidator(req.params);

export const makeApproveMissingPosterValidator = () => async (req: HttpRequest) =>
  approveMissingPosterSchemaValidator(req.params);

export const makeDenyMissingPosterValidator = () => async (req: HttpRequest) =>
  denyMissingPosterSchemaValidator(req.params);

export const makeDeleteOneMissingPosterValidator = () => async (req: ExpressRequestSession) =>
  deleteOneMissingPosterSchemaValidator({
    ...req,
    body: { [MissingPoster.UpdatedBy]: req[ServerConstants.Session].user.id },
  });

export const makeGetAllMissingPostersValidator = () => async (req: ExpressRequestSession) =>
  [UserRoles.FindAllInAdmin, UserRoles.InstitutionAdmin].includes(
    req[ServerConstants.Session]?.user?.role as UserRoles
  )
    ? getAllMissingPostersSchemaValidator(req.query)
    : getAllMissingPostersSchemaValidator({
        ...req.query,
        [MissingPoster.ApprovalStatus]: MissingPosterApprovalStatus.Approved,
      });

export const makeGetMissingPosterGroupedByStatusValidator = () => async (req: HttpRequest) =>
  getMissingPosterGroupedByStatusSchemaValidator(req.query);

export const makeGetMissingPosterGroupedByCountyValidator = () => async (req: HttpRequest) =>
  getMissingPosterGroupedByCountySchemaValidator(req.query);
