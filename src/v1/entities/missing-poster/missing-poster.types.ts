import { MissingPoster, MissingPosterStatus } from '../../../constants';
import { Entity } from '../entity.types';

export interface IMissingPoster extends Entity {
  [MissingPoster.Name]: string;
  [MissingPoster.CreatedBy]: string;
  [MissingPoster.LastSeenAt]: string;
  [MissingPoster.LastSeenDate]: string;
  [MissingPoster.Photo]: string;
  [MissingPoster.Status]: `${MissingPosterStatus}`;
}

export interface IMissingPosterInput {
  [MissingPoster.Name]: string;
  [MissingPoster.LastSeenAt]: string;
  [MissingPoster.LastSeenDate]: string;
  [MissingPoster.Photo]: string;
  [MissingPoster.CreatedBy]: string;
}
