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

export enum MissingPoster {
  Address = 'address',
  Name = 'name',
  Status = 'status',
  Photo = 'photo',
  LastSeenDate = 'lastSeenDate',
  LastSeenAt = 'lastSeenAt',
  CreatedBy = 'createdBy',
}

export enum TotalCountCollection {
  CollectionName = 'collectionName',
  TotalCount = 'totalCount',
}

export enum CollectionNames {
  Users = 'users',
  TotalCountCollections = 'totalCountCollections',
  Citizens = 'citizens',
  MissingPosters = 'missingPosters',
}
