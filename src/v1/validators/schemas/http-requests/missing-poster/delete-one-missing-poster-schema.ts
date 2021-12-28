import joi from 'joi';

import joiValidator from '../../../index';
import { DeleteOnePoster } from '../../../types/missing-poster';
import { idSchema } from '../sub-schemas';

const deleteOneMissingPosterSchema = joi.object({ params: idSchema }).required().unknown(true);

export default joiValidator<DeleteOnePoster>(deleteOneMissingPosterSchema);
