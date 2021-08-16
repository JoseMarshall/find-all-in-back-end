export enum User {
  Role = 'role',
  Name = 'name',
  Email = 'email',
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

export enum TotalCountCollection {
  CollectionName = 'collectionName',
  TotalCount = 'totalCount',
}

export enum CollectionNames {
  Users = 'users',
  TotalCountCollections = 'totalCountCollections',
  Citizens = 'citizens',
}
