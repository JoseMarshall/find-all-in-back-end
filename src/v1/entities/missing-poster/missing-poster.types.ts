import { MissingPoster, MissingPosterStatus } from '../../../constants';
import { Entity, IAddress } from '../entity.types';

export interface IMissingPoster extends Entity {
  [MissingPoster.Name]: string;
  [MissingPoster.Address]: IAddress;
  [MissingPoster.CreatedBy]: string;
  [MissingPoster.LastSeenAt]: string;
  [MissingPoster.LastSeenDate]: string;
  [MissingPoster.Photo]: string;
  [MissingPoster.Status]: `${MissingPosterStatus}`;
}

export type IMissingPosterInput = Pick<
  IMissingPoster,
  | MissingPoster.Name
  | MissingPoster.LastSeenAt
  | MissingPoster.LastSeenDate
  | MissingPoster.Photo
  | MissingPoster.CreatedBy
  | MissingPoster.Address
>;
