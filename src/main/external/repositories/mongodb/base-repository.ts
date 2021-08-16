import { ClientSession, Document, Model } from 'mongoose';

import { Entity } from '../../../../v1/entities/entity.types';
import { GetAll, GetOne } from '../../../../v1/validators/types/sub-types';
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
    async get(query: GetOne, options: Record<string, any>) {
      return makeGetOneEntity<D, T>({ model, options })(query);
    },
    async getAll(query: GetAll, options: Record<string, any>) {
      return makeGetAllEntities<D, T>({ model, options })(query);
    },
    async findOne(filter: Record<string, any>, options: Record<string, any>) {
      return makeFindOneEntity<D, T>({ model, options })(filter);
    },
    async remove(query: GetOne) {
      return makeDeleteOneEntity<D>({ model, transaction })(query);
    },
    async update(query: GetOne, body: Omit<Record<string, any>, keyof Entity>) {
      return makeUpdateOneEntity<D, T>({ model, transaction })(query, body);
    },
    async getGroupedData(
      query: Record<string, any> & { sortBy?: string; includeDeleted?: string },
      options: Record<string & 'groupBy', any>
    ) {
      return makeGetGroupedEntity<D, unknown>({ model, options })(query);
    },
  };
  return repository;
}

export default BaseRepository;
