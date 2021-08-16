import { HttpRequest } from '../../../../../main/adapters/adapters.types';
import loginSchemaValidator from './login-schema';

// eslint-disable-next-line import/prefer-default-export
export const makeLoginValidator = () => async (req: HttpRequest) => loginSchemaValidator(req.body);
