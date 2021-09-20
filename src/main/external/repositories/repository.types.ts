import { Common, TimeStamps } from '../../../constants';
import { ICitizen } from '../../../v1/entities/citizen/citizen.types';
import { Entity } from '../../../v1/entities/entity.types';
import { IMissingPoster } from '../../../v1/entities/missing-poster/missing-poster.types';
import { INotification } from '../../../v1/entities/notification/notification.types';
import { IUser } from '../../../v1/entities/user/user.types';
import { GetAllNotifications } from '../../../v1/validators/types/notification';
import { GetAll, GetOne } from '../../../v1/validators/types/sub-types';
import { MakeGetAllEntitiesDependencies } from './mongodb/mongoose.types';
import {
  UpdateAllNotifications,
  UpdateManyNotifications,
  UpdateOneNotification,
} from './mongodb/notification-repository/notification-repository.types';

export interface GetAllEntitiesData<T> {
  data: ReadonlyArray<T>;
  count: number;
}

export interface DeletedEntity {
  [Common.Id]: string;
  [Common.IsDeleted]: boolean;
  [TimeStamps.CreatedAt]: string;
  [TimeStamps.UpdatedAt]: string;
}

export interface GroupBy {
  [Common.Id]: Record<string, string> | string;
  total: Record<string, string | number>;
}

export interface IRepository<T> {
  add(entity: T): Promise<T>;
  update(query: GetOne, body: Omit<Record<string, any>, keyof Entity>): Promise<T>;
  remove(query: GetOne): Promise<DeletedEntity>;
  get<O>(query: GetOne, options: O): Promise<T>;
  getAll<O>(query: GetAll, options: O): Promise<GetAllEntitiesData<T>>;
  getGroupedData?: <O>(
    query: Record<string, any> & { sortBy?: string; includeDeleted?: string },
    options: O & Record<string, any> & Record<'groupBy', GroupBy>
  ) => Promise<{ data: readonly any[] }>;
  findOne<O>(filter: Record<string, any>, options?: O): Promise<T>;
}

export interface INotificationRepository {
  updateOne(req: UpdateOneNotification): Promise<{ updated: boolean }>;
  updateMany(req: UpdateManyNotifications): Promise<{ updated: boolean }>;
  updateAll(req: UpdateAllNotifications): Promise<{ updated: boolean }>;
  getAll(
    req: GetAllNotifications,
    options: MakeGetAllEntitiesDependencies<INotification>
  ): Promise<GetAllEntitiesData<INotification>>;
}

export interface IUnitOfWork {
  transaction: unknown;
  makeUserRepository: () => IRepository<IUser>;
  makeNotificationRepository: () => INotificationRepository;
  makeCitizenRepository: () => IRepository<ICitizen>;
  makeMissingPosterRepository: () => IRepository<IMissingPoster>;
  commitChanges(): Promise<void>;
  rollback(): Promise<void>;
  startTransaction(): Promise<void>;
}
