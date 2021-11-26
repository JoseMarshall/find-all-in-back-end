import { Comment } from '../../../../constants';
import { GetAll } from '../sub-types';

export interface GetAllComments extends GetAll {
  [Comment.MissingPoster]?: string;
  [Comment.PostedBy]?: string;
}
