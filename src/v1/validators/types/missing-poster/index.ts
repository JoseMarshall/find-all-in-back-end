import { MissingPoster } from '../../../../constants';
import { GetAll } from '../sub-types';

export interface GetAllMissingPosters extends GetAll {
  [MissingPoster.Name]?: string;
  [MissingPoster.LastSeenDate]?: string;
  [MissingPoster.CreatedBy]?: string;
  [MissingPoster.Status]?: string;
}

export interface UpdateLikesPoster {
  params: { id: string };
  body: {
    [MissingPoster.Likes]: number;
    [MissingPoster.Dislikes]: number;
  };
}
