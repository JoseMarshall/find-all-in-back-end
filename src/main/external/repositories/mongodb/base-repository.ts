import { ClientSession, Document, Model } from 'mongoose';

import { Entity } from '../../../../v1/entities/entity.types';
import { IRepository } from '../repository.types';
import {
  makeCreateEntity,
  makeDeleteOneEntity,
  makeFindOneEntity,
  makeGetAllEntities,
  makeGetGroupedEntity,
  makeGetOneEntity,
  makeUpdateOneEntity,
} from './methods';

function BaseRepository<D extends Document, T extends Entity>(
  model: Model<D>,
  transaction: ClientSession
): IRepository<T> {
  const repository: IRepository<T> = {
    async add(entity: T) {
      return makeCreateEntity<D, T>({ model, transaction })(entity);
    },
    async get(query, options) {
      return makeGetOneEntity<D, T>({ model, options, transaction })(query);
    },
    async getAll(query, options) {
      return makeGetAllEntities<D, T>({ model, options })(query);
    },
    async findOne(filter, options) {
      return makeFindOneEntity<D, T>({ model, options, transaction })(filter);
    },
    async remove(query) {
      return makeDeleteOneEntity<D>({ model, transaction })(query);
    },
    async update(query, body) {
      return makeUpdateOneEntity<D, T>({ model, transaction })(query, body);
    },
    async getGroupedData(query, options) {
      return makeGetGroupedEntity<D, any>({ model, options })(query);
    },
  };
  return repository;
}

export default BaseRepository;
