import { HttpRequest } from '../../../../../main/adapters/adapters.types';
import getOneCitizenSchemaValidator from './get-one-citizen-schema';
import signupCitizenSchemaValidator from './signup-citizen-schema';

// eslint-disable-next-line import/prefer-default-export
export const makeSignupCitizenValidator = () => async (req: HttpRequest) =>
  signupCitizenSchemaValidator(req.body);

export const makeGetOneCitizenValidator = () => async (req: HttpRequest) =>
  getOneCitizenSchemaValidator(req.params);
