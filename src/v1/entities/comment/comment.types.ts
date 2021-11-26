import { Comment } from '../../../constants';
import { Entity } from '../entity.types';

export interface IComment extends Entity {
  [Comment.Text]: string;
  [Comment.PostedBy]: string;
  [Comment.MissingPoster]: string;
}

export type ICommentInput = Omit<IComment, keyof Entity>;
