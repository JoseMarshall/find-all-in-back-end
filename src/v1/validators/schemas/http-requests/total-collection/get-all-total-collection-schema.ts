import joi from 'joi';

import { TotalCountCollection } from '../../../../../constants';
import joiValidator from '../../../index';
import { GetAllTotalCollections } from '../../../types/total-collections';
import { getAllSchema } from '../sub-schemas';

const getAllTotalCollectionsSchema = joi
  .object({
    [TotalCountCollection.CollectionName]: joi.string().pattern(/^(\w+\|)*\w+$/),
  })
  .append(getAllSchema)
  .required()
  .unknown(false);

export default joiValidator<GetAllTotalCollections>(getAllTotalCollectionsSchema);
