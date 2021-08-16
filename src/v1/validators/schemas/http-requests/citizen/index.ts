import { HttpRequest } from '../../../../../main/adapters/adapters.types';
import signupCitizenSchemaValidator from './signup-citizen-schema';

// eslint-disable-next-line import/prefer-default-export
export const makeSignupCitizenValidator = () => async (req: HttpRequest) =>
  signupCitizenSchemaValidator(req.body);
