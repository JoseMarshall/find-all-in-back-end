import { Schema } from 'mongoose';

import { Address, AngolaProvinces } from '../../../../../constants';

// eslint-disable-next-line import/prefer-default-export
export const addressSchema = new Schema(
  {
    [Address.Province]: {
      type: String,
      required: true,
      trim: true,
      enum: Object.values(AngolaProvinces),
    },
    [Address.County]: { type: String, required: true, trim: true },
    [Address.Street]: { type: String, required: false, trim: true },
    [Address.Number]: { type: String, required: false, trim: true },
  },
  {
    _id: false,
  }
);
