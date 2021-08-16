import { ObjectId } from 'bson';

import { Common, User, UserRoles } from '../../constants';

export default {
  [Common.Id]: '82fa8d90-595f-469c-ba5e-c2ae55cca8a2',
  [Common.MongoId]: new ObjectId('82fa8d90-595f-469c-ba5e-c2ae55cca8a2'),
  [User.Name]: process.env.DEFAULT_ADMIN_NAME ?? 'find-all-in admin',
  [User.Email]: process.env.DEFAULT_ADMIN_EMAIL ?? 'admin@findallin.com',
  [User.Username]: process.env.DEFAULT_ADMIN_USERNAME ?? 'admin',
  [User.Password]: process.env.DEFAULT_ADMIN_PASSWORD ?? 'admin',
  [User.Role]: UserRoles.FindAllInAdmin,
};
