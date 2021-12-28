export enum Common {
  Id = 'id',
  MongoId = '_id',
  IsDeleted = 'isDeleted',
}

export enum TimeStamps {
  CreatedAt = 'createdAt',
  UpdatedAt = 'updatedAt',
}

export enum MissingPosterStatus {
  Missing = 'missing',
  Found = 'found',
  Seen = 'seen',
}

export enum MissingPosterApprovalStatus {
  Pending = 'pending',
  Approved = 'approved',
  Denied = 'denied',
}

export enum Address {
  Province = 'province',
  County = 'county',
  Street = 'street',
  Number = 'number',
}
