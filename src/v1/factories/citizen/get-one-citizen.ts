import makeGetOneEntityController from '../../controllers/get-one-entity';
import { ICitizen } from '../../entities/citizen/citizen.types';
import { getDetailedCitizenUC } from '../../usecases/get-detailed-citizen';
import { makeGetOneCitizenValidator } from '../../validators/schemas/http-requests/citizen';
import { GetOne } from '../../validators/types/sub-types';

const citizenSignup = makeGetOneEntityController<ICitizen, GetOne>({
  findOne: getDetailedCitizenUC(),
  requestValidator: makeGetOneCitizenValidator(),
});

export default citizenSignup;
