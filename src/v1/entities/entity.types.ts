import { Common, TimeStamps } from '../../constants';

export interface Entity {
  [Common.Id]: string;
  [TimeStamps.CreatedAt]: Date;
  [TimeStamps.UpdatedAt]: Date;
  [Common.IsDeleted]: boolean;
}
