import { Employee } from '../../../../constants';
import { GetAll } from '../sub-types';

export interface GetAllEmployees extends GetAll {
  [Employee.Name]?: string;
}
