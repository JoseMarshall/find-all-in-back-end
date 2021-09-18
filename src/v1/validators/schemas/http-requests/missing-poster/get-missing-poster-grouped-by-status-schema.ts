import joi from 'joi';

import joiValidator from '../../../index';

const schema = joi.object({}).required().unknown(false);

export default joiValidator<{}>(schema);
