import { IUnitOfWork } from '../repository.types';
import BaseRepository from './base-repository';
import { MongoHelper } from './helpers/mongo-helper';
import { NotificationRepository } from './index';
import { CitizenModel, MissingPosterModel, UserModel } from './models';

async function UnitOfWork() {
  const uow: IUnitOfWork = {
    transaction: null,
    makeUserRepository() {
      return BaseRepository(UserModel, this.transaction);
    },
    makeCitizenRepository() {
      return BaseRepository(CitizenModel, this.transaction);
    },
    makeMissingPosterRepository() {
      return BaseRepository(MissingPosterModel, this.transaction);
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
