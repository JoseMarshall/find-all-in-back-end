export enum User {
  Role = 'role',
  Name = 'name',
  Email = 'email',
  CreatedBy = 'createdBy',
  Username = 'username',
  Password = 'password',
  ResetPassword = 'resetPassword',
}

export enum UserRoles {
  FindAllInAdmin = 'findAllInAdmin',
  FindAllInEmployee = 'findAllInEmployee',
  InstitutionAdmin = 'institutionAdmin',
  InstitutionEmployee = 'institutionEmployee',
  Citizen = 'citizen',
}

export enum Citizen {
  Name = 'name',
  UserAccount = 'userAccount',
}

export enum Notification {
  MissingPoster = 'missingPoster',
  Type = 'type',
}

export enum NotificationTypes {
  Create = 'create',
  Update = 'update',
}

export enum MissingPoster {
  Address = 'address',
  Name = 'name',
  Status = 'status',
  Photo = 'photo',
  LastSeenDate = 'lastSeenDate',
  LastSeenAt = 'lastSeenAt',
  CreatedBy = 'createdBy',
  UpdatedBy = 'updatedBy',
}

export enum TotalCountCollection {
  CollectionName = 'collectionName',
  TotalCount = 'totalCount',
}

export enum CollectionNames {
  Users = 'users',
  Notifications = 'notifications',
  TotalCountCollections = 'totalCountCollections',
  Citizens = 'citizens',
  MissingPosters = 'missingPosters',
}
