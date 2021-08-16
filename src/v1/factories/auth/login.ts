import makeLoginController from '../../controllers/auth/login';
import { loginUC } from '../../usecases/login';
import { makeLoginValidator } from '../../validators/schemas/http-requests/auth';

const login = makeLoginController({
  login: loginUC(),
  requestValidator: makeLoginValidator(),
});

export default login;
