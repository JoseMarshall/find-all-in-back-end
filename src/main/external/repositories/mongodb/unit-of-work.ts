import { IUnitOfWork } from '../repository.types';
import BaseRepository from './base-repository';
import { MongoHelper } from './helpers/mongo-helper';
import { NotificationRepository } from './index';
import {
  CitizenModel,
  CommentModel,
  MissingPosterModel,
  TotalCollectionModel,
  UserModel,
} from './models';

async function UnitOfWork() {
  const uow: IUnitOfWork = {
    transaction: null,
    makeTotalCollectionRepository() {
      return BaseRepository(TotalCollectionModel, this.transaction);
    },
    makeUserRepository() {
      return BaseRepository(UserModel, this.transaction);
    },
    makeCitizenRepository() {
      return BaseRepository(CitizenModel, this.transaction);
    },
    makeMissingPosterRepository() {
      return BaseRepository(MissingPosterModel, this.transaction);
    },
    makeCommentRepository() {
      return BaseRepository(CommentModel, this.transaction);
    },
    makeNotificationRepository() {
      return NotificationRepository(this.transaction);
    },
    async commitChanges() {
      await this.transaction.commitTransaction();
      this.transaction.endSession();
    },
    async rollback() {
      await this.transaction.abortTransaction();
      this.transaction.endSession();
    },
    async startTransaction() {
      this.transaction = await MongoHelper.getInstance().startSession();
      this.transaction.startTransaction();
    },
  };
  return uow;
}

export default UnitOfWork;
