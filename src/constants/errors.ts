export enum ApiErrorsName {
  DuplicateKey = 'DUPLICATE_KEY',
  GenericName = 'ERROR',
  MissingFields = 'MISSING_FIELDS',
  ProtectedResource = 'PROTECTED_RESOURCE',
  InvalidToken = 'INVALID_TOKEN',
  NoMatchedSchema = 'NO_MATCHED_SCHEMA',
  ResourceNotFound = 'RESOURCE_NOT_FOUND',
  SigningUrlError = 'SIGNING_URL_ERROR',
  NotEnoughFunds = 'NOT_ENOUGH_FUNDS',
  StatusUpdateNotAllowed = 'STATUS_UPDATE_NOT_ALLOWED',
}

export enum ApiErrorsType {
  ValidationError = 'VALIDATION_ERROR',
  AuthorizationError = 'AUTHORIZATION_ERROR',
  GenericType = 'ERROR',
  InternalError = 'INTERNAL_ERROR',
  EmailError = 'EMAIL_ERROR',
  TotalCollectionError = 'TOTAL_COLLECTION_ERROR',
  S3BucketError = 'S3_BUCKET_ERROR',
  FundsError = 'FUNDS_ERROR',
  UpdateProcessError = 'UPDATE_CLAIM_ERROR',
}
export type ApiErrorsStatusCode =
  | 100
  | 101
  | 102
  | 200
  | 201
  | 202
  | 203
  | 204
  | 205
  | 206
  | 207
  | 208
  | 226
  | 300
  | 301
  | 302
  | 303
  | 304
  | 305
  | 306
  | 307
  | 308
  | 400
  | 401
  | 402
  | 403
  | 404
  | 405
  | 406
  | 407
  | 408
  | 409
  | 410
  | 411
  | 412
  | 413
  | 414
  | 415
  | 416
  | 417
  | 418
  | 420
  | 422
  | 423
  | 424
  | 425
  | 426
  | 428
  | 429
  | 431
  | 444
  | 449
  | 450
  | 451
  | 499
  | 500
  | 501
  | 502
  | 503
  | 504
  | 505
  | 506
  | 507
  | 508
  | 509
  | 510
  | 511
  | 598
  | 599;

export type ApiErrorsI18nCode =
  | 'E-1000'
  | 'E-1001'
  | 'E-1002'
  | 'E-1003'
  | 'E-1004'
  | 'E-1005'
  | 'E-1006'
  | 'E-1007'
  | 'E-1008'
  | 'E-1010'
  | 'E-1011'
  | 'E-1012'
  | 'E-1013'
  | 'E-1014'
  | 'E-1015'
  | 'E-1016'
  | 'E-1017'
  | 'E-1018'
  | 'E-1019'
  | 'E-1020'
  | 'E-1021'
  | 'S-3000'
  | 'S-3001'
  | 'S-3002'
  | 'S-3003'
  | 'S-3004'
  | 'S-3005'
  | 'S-3006'
  | 'S-3007'
  | 'S-3008'
  | 'S-3009'
  | 'S-3010'
  | 'S-3011'
  | 'S-3012'
  | 'W-2000'
  | 'W-2001'
  | 'W-2002';
