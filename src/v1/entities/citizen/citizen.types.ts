import { Citizen, User } from '../../../constants';
import { Entity } from '../entity.types';

export interface ICitizen extends Entity {
  [Citizen.Name]: string;
  [Citizen.UserAccount]: string;
}

export interface ICitizenInput {
  [Citizen.Name]: string;
  [User.Email]: string;
  [User.Username]: string;
  [User.Password]: string;
}
