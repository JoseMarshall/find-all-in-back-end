import { DeletedEntity } from '../../../main/external/repositories/mongodb/mongoose.types';
import makeDeleteOneEntityController from '../../controllers/delete-entity';
import { deleteOneEmployeeUC } from '../../usecases/delete-one-employee';
import { makeDeleteOneEmployeeValidator } from '../../validators/schemas/http-requests/employee';
import { GetOne } from '../../validators/types/sub-types';

const deleteOneEmployee = makeDeleteOneEntityController<DeletedEntity, GetOne>({
  deleteAll: deleteOneEmployeeUC(),
  requestValidator: makeDeleteOneEmployeeValidator(),
});

export default deleteOneEmployee;
