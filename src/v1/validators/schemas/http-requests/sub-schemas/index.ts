import joi from 'joi';

import { Common } from '../../../../../constants';
import { limitQueryRegex, pageQueryRegex, sortByStringfiedRegex } from '../../../../../utils';

export const getAllSchema = {
  page: joi.string().required().regex(pageQueryRegex),
  limit: joi.string().regex(limitQueryRegex),
  sortBy: joi.string().pattern(sortByStringfiedRegex),
};

export const idSchema = {
  [Common.Id]: joi.string().uuid({ version: 'uuidv4' }).required(),
};
