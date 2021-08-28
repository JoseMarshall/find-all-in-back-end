import { Common } from '../../../../../constants';
import { logger } from '../../../../../olyn/logger';
import { LookUpOptions } from '../mongoose.types';

const makeLookUpTemplate = () =>
  `[{"$lookup":{"from":"FROM_TABLE","as":"ALIAS","let":{"foreign_id":"$FOREIGN_FIELD"}`;

const makePipeLineTemplate = () => `,"pipeline":[{"$match":{"$expr":MATCH_EXPRESSION}}`;

// eslint-disable-next-line import/prefer-default-export
export function generateLookUp(
  lookUpOptions: Array<LookUpOptions> | LookUpOptions
): ReadonlyArray<Record<string, unknown>> {
  try {
    return (lookUpOptions instanceof Array ? lookUpOptions : [lookUpOptions]).flatMap(
      (lookup: LookUpOptions) => {
        const FROM_TABLE = lookup.from;
        const FOREIGN_FIELD = lookup.foreignField;
        const ALIAS = lookup.alias ?? lookup.foreignField;
        const PER_DOC_LIMIT = lookup.isForeignFieldArray ? `,{"$limit":${lookup.limit || 15}}` : '';
        const PROJECT_FIELDS = lookup.select
          ? `,{"$project":${JSON.stringify({ [Common.MongoId]: 0, ...lookup.select })}}`
          : `,{"$project":{"${Common.MongoId}":0}}`;
        const SORT_BY_FIELD = lookup.sort ? `,{"$sort":${JSON.stringify(lookup.sort)}}` : '';

        const pipelineTemplate = makePipeLineTemplate()
          .concat(PER_DOC_LIMIT, PROJECT_FIELDS, SORT_BY_FIELD, ']')
          .replace(
            /MATCH_EXPRESSION/g,
            lookup.isForeignFieldArray
              ? JSON.stringify(lookup.matchExp) ??
                  `{"$in":["$${lookup.connectTo ?? Common.Id}",{"$ifNull":["$$$foreign_id",[]]}]}`
              : JSON.stringify(lookup.matchExp) ??
                  `{"$eq":["$${lookup.connectTo ?? Common.Id}","$$$foreign_id"]}`
          );

        const lookupTemplate = makeLookUpTemplate()
          .concat(pipelineTemplate, '}}')
          .concat(
            lookup.isForeignFieldArray
              ? ']'
              : `,{"$unwind":{"path":"$${
                  lookup.alias ?? 'FOREIGN_FIELD'
                }","preserveNullAndEmptyArrays":true}}]`
          )
          .replace(/FOREIGN_FIELD/g, FOREIGN_FIELD)
          .replace(/FROM_TABLE/g, FROM_TABLE)
          .replace(/ALIAS/g, ALIAS);

        return JSON.parse(lookupTemplate);
      }
    );
  } catch (error) {
    logger.error(error);
    return [];
  }
}
