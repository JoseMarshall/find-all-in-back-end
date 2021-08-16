import makeCreateEntityController from '../../controllers/create-entity';
import { IUser, IUserInput } from '../../entities/user/user.types';
import { createFindAllInAdminUC } from '../../usecases/create-find-all-in-admin';
import { makeCreateUserValidator } from '../../validators/schemas/http-requests/user';

const createFindAllInAdmin = makeCreateEntityController<IUser, IUserInput>({
  create: createFindAllInAdminUC(),
  requestValidator: makeCreateUserValidator(),
});

export default createFindAllInAdmin;
