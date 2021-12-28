import {
  MissingPoster,
  MissingPosterApprovalStatus,
  MissingPosterStatus,
} from '../../../constants';
import { Entity, IAddress } from '../entity.types';

export interface IMissingPoster extends Entity {
  [MissingPoster.Name]: string;
  [MissingPoster.Address]: IAddress;
  [MissingPoster.CreatedBy]: string;
  [MissingPoster.UpdatedBy]: string;
  [MissingPoster.LastSeenAt]: string;
  [MissingPoster.LastSeenDate]: string;
  [MissingPoster.Photo]: string;
  [MissingPoster.Feedback]?: string;
  [MissingPoster.DisappearanceParticipation]?: string;
  [MissingPoster.Status]: `${MissingPosterStatus}`;
  [MissingPoster.ApprovalStatus]: `${MissingPosterApprovalStatus}`;
}

export type IMissingPosterInput = Pick<
  IMissingPoster,
  | MissingPoster.Name
  | MissingPoster.LastSeenAt
  | MissingPoster.LastSeenDate
  | MissingPoster.Photo
  | MissingPoster.DisappearanceParticipation
  | MissingPoster.Feedback
  | MissingPoster.CreatedBy
  | MissingPoster.UpdatedBy
  | MissingPoster.Address
  | MissingPoster.Status
>;
