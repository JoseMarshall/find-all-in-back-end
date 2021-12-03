import { CollectionNames, Employee } from '../../../../../constants';
import { incTotalCount } from '../helpers/entity-model-fn';
import { MongoHelper } from '../helpers/mongo-helper';
import { EmployeeDocument } from './model.types';
import SchemaConstructor from './schema-constructor';

const employeeSchema = SchemaConstructor({
  [Employee.Name]: { type: String, required: true, trim: true },
  [Employee.Role]: { type: String, required: true, trim: true },
  [Employee.IdentificationNumber]: { type: String, required: true, trim: true },
  [Employee.UserAccount]: { type: String, required: true, ref: CollectionNames.Users },
});

employeeSchema.set('toObject', {
  virtuals: true,
});

employeeSchema.set('toJSON', {
  virtuals: true,
});

employeeSchema.post('save', incTotalCount);

export default MongoHelper.getModel<EmployeeDocument>(CollectionNames.Employees, employeeSchema);
