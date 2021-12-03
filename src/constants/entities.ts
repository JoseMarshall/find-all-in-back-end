export enum User {
  Role = 'role',
  Name = 'name',
  Email = 'email',
  Photo = 'photo',
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

export enum Employee {
  Name = 'name',
  IdentificationNumber = 'identificationNumber',
  Role = 'role',
  UserAccount = 'userAccount',
}

export enum UsersNotification {
  UserId = 'userId',
  Notification = 'notification',
  IsRead = 'isRead',
}

export enum Notification {
  MissingPoster = 'missingPoster',
  Type = 'type',
}

export enum NotificationTypes {
  Create = 'create',
  Update = 'update',
}

export enum Comment {
  MissingPoster = 'missingPoster',
  Text = 'text',
  PostedBy = 'postedBy',
}

export enum MissingPoster {
  Address = 'address',
  Name = 'name',
  Status = 'status',
  PreviousStatus = 'previousStatus',
  Photo = 'photo',
  DisappearanceParticipation = 'disappearanceParticipation',
  Feedback = 'feedback',
  Likes = 'likes',
  Dislikes = 'dislikes',
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
  Employees = 'employees',
  Notifications = 'notifications',
  TotalCountCollections = 'totalCountCollections',
  Citizens = 'citizens',
  Comments = 'comments',
  MissingPosters = 'missingPosters',
  UsersNotifications = 'usersNotifications',
}
