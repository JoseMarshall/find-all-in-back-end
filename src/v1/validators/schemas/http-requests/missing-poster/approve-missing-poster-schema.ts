import joi from 'joi';

import joiValidator from '../../../index';
import { GetOne } from '../../../types/sub-types';
import { idSchema } from '../sub-schemas';

const approveMissingPosterSchema = joi.object(idSchema).required().unknown(false);

export default joiValidator<GetOne>(approveMissingPosterSchema);
