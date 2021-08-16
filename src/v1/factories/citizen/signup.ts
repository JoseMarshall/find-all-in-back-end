import makeCreateEntityController from '../../controllers/create-entity';
import { ICitizen, ICitizenInput } from '../../entities/citizen/citizen.types';
import { citizenSignUpUC } from '../../usecases/citizen-sign-up';
import { makeSignupCitizenValidator } from '../../validators/schemas/http-requests/citizen';

const citizenSignup = makeCreateEntityController<ICitizen, ICitizenInput>({
  create: citizenSignUpUC(),
  requestValidator: makeSignupCitizenValidator(),
});

export default citizenSignup;
