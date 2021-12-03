import { Employee, User } from '../../../constants';
import { Entity } from '../entity.types';

export interface IEmployee extends Entity {
  [Employee.Name]: string;
  [Employee.UserAccount]: string;
  [Employee.Role]: string;
  [Employee.IdentificationNumber]: string;
}

export interface IEmployeeInput {
  [Employee.Name]: string;
  [Employee.Role]: string;
  [Employee.IdentificationNumber]: string;
  [User.Email]: string;
  [User.Username]: string;
  [User.Password]: string;
}
