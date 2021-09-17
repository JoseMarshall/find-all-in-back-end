import { v4 as uuid } from 'uuid';

import { Common, MissingPoster, MissingPosterStatus, TimeStamps } from '../../../constants';
import { IMissingPosterInput } from './missing-poster.types';

// eslint-disable-next-line import/prefer-default-export
export const makeMissingPoster = (
  data: IMissingPosterInput & { [MissingPoster.CreatedBy]: string },
  id?: string
) => ({
  [Common.Id]: id ?? uuid(),
  ...data,
  [MissingPoster.Status]: MissingPosterStatus.Missing,
  [Common.IsDeleted]: false,
  [TimeStamps.CreatedAt]: new Date(),
  [TimeStamps.UpdatedAt]: new Date(),
});