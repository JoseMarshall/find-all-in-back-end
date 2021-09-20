import { ClientSession } from 'mongoose';

import { INotificationRepository } from '../../repository.types';
import {
  makeCreateNotification,
  makeGetAllNotifications,
  makeUpdateAllNotifications,
  makeUpdateManyNotifications,
  makeUpdateOneNotification,
} from './methods';

function NotificationRepository(transaction: ClientSession) {
  const repository: INotificationRepository = {
    async add(data) {
      return makeCreateNotification(transaction)(data);
    },
    async getAll(req, options) {
      return makeGetAllNotifications(options)(req);
    },
    async updateOne(req) {
      return makeUpdateOneNotification(transaction)(req);
    },
    async updateMany(req) {
      return makeUpdateManyNotifications(transaction)(req);
    },
    async updateAll(req) {
      return makeUpdateAllNotifications(transaction)(req);
    },
  };
  return repository;
}

export default NotificationRepository;
