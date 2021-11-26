import makeCreateEntityController from '../../controllers/create-entity';
import { IUser } from '../../entities/user/user.types';
import { updateUserDataUC } from '../../usecases/update-user-data';
import { makeUpdateUserValidator } from '../../validators/schemas/http-requests/user';
import { UpdateUser } from '../../validators/types/user';

const updateUserData = makeCreateEntityController<IUser, UpdateUser>({
  create: updateUserDataUC(),
  requestValidator: makeUpdateUserValidator(),
});

export default updateUserData;
