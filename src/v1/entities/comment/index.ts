import { v4 as uuid } from 'uuid';

import { Common, TimeStamps } from '../../../constants';
import { ICommentInput } from './comment.types';

// eslint-disable-next-line import/prefer-default-export
export const makeComment = (data: ICommentInput, id?: string) => ({
  [Common.Id]: id ?? uuid(),
  ...data,
  [Common.IsDeleted]: false,
  [TimeStamps.CreatedAt]: new Date(),
  [TimeStamps.UpdatedAt]: new Date(),
});
