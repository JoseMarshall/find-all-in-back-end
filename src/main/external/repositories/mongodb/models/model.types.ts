import { Document } from 'mongoose';

import { Citizen, Common, TotalCountCollection, User } from '../../../../../constants';
import { Entity } from '../../../../../v1/entities/entity.types';

export interface UserDocument extends Document, Omit<Entity, Common.Id> {
  [User.Name]: string;
  [User.Email]: string;
  [User.Password]: string;
  [User.Username]: string;
  [User.Role]: string;
}

export interface TotalCollectionsDocument extends Document, Omit<Entity, Common.Id> {
  [TotalCountCollection.CollectionName]: string;
  [TotalCountCollection.TotalCount]: number;
}

export interface CitizenDocument extends Document, Omit<Entity, Common.Id> {
  [Citizen.Name]: string;
  [Citizen.UserAccount]: string;
}
