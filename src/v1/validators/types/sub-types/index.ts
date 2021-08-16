import { Common } from '../../../../constants';

export interface GetAll {
  page: string;
  limit?: string;
  sortBy?: string;
}

export interface GetOne {
  [Common.Id]: string;
}
