import { Address, AngolaProvinces, Common, TimeStamps } from '../../constants';

export interface Entity {
  [Common.Id]: string;
  [TimeStamps.CreatedAt]: Date;
  [TimeStamps.UpdatedAt]: Date;
  [Common.IsDeleted]: boolean;
}

export interface IAddress {
  [Address.Province]: `${AngolaProvinces}`;
  [Address.County]: string;
  [Address.Street]: string;
  [Address.Number]: string;
}

export interface GroupedBy<T> {
  name: T;
  total: number;
}
