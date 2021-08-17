import * as bcrypt from 'bcrypt';

import { Common, User, UserRoles } from '../../constants';

export default async () => ({
  [Common.Id]: '82fa8d90-595f-469c-ba5e-c2ae55cca8a2',
  [Common.MongoId]: '82fa8d90-595f-469c-ba5e-c2ae55cca8a2',
  [User.Name]: process.env.DEFAULT_ADMIN_NAME ?? 'find-all-in admin',
  [User.Email]: process.env.DEFAULT_ADMIN_EMAIL ?? 'admin@findallin.com',
  [User.Username]: process.env.DEFAULT_ADMIN_USERNAME ?? 'admin',
  [User.Password]: await bcrypt.hash(process.env.DEFAULT_ADMIN_PASSWORD ?? 'admin', 10),
  [User.Role]: UserRoles.FindAllInAdmin,
});
