import { Common, TimeStamps } from '../../constants';

export interface Entity {
  [Common.Id]: string;
  [TimeStamps.CreatedAt]: string;
  [TimeStamps.UpdatedAt]: string;
  [Common.IsDeleted]: boolean;
}
