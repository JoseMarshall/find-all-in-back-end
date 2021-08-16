import { ObjectId } from 'bson';
import { Types as MongooseTypes } from 'mongoose';

import { safeParseBoolean, safeParseFloat, safeParseObject } from './data-parsers';

/**
 * @description Add a number of days to a Date
 * @param date The date you intend to add days to
 * @param days The number of days you intend to add, N.B.: You can pass negative numbers if you intend to subtract days instead of add
 * @returns The new date added the specified number of days
 */
export function addDays(date: Date, days: number) {
  const newDate = new Date(Number(date));
  newDate.setDate(date.getDate() + days);
  return newDate.getDate() ? newDate : undefined;
}

/**
 * @description Validate if a string is a mongoose ObjectId
 * @param id the string to be validated
 * @returns true (means is valid) or false (means is not valid) depending on the validation
 */
export const isValidMongooseObjectId = (id: string) =>
  ObjectId.isValid(id) && String(new ObjectId(id)) === id;

/**
 * @description Apply a case insensitive regex pattern to a string
 * @param x The string to apply the regex to
 * @returns a RegExp object which does case insensitive matching with all text containing the passed string
 */
export const makeCaseInsensitiveRegex = (x: string) => new RegExp(`.*${x}.*`, 'i');

/**
 * @description Apply a formation to an object, applying the case insensitive regex pattern on each its string entries
 * @param query The object to format
 * @returns An object with case insensitive regex pattern in all of its string entries
 */
export const formatQueryToRegex = (query: Record<string, string | string[]>) =>
  Object.keys(query).reduce((acc: Record<string, any>, queryKey: string) => {
    const value = query[queryKey];
    if (typeof value !== 'string') return { ...acc, [queryKey.replace(/>/g, '.')]: value };

    if (isValidMongooseObjectId(value))
      return { ...acc, [queryKey.replace(/>/g, '.')]: MongooseTypes.ObjectId(value) };

    const mapValue = {
      true: () => {
        // Assumes the query values follow this format: value1|value2
        const valuesArray = value.split('|');
        return {
          // Transforms the query key 'firstName|lastName' to ['firstName', 'lastName']
          $or: queryKey.split('|').reduce(
            (x, key, index) =>
              x.concat({
                [key.replace(/>/g, '.')]: isValidMongooseObjectId(valuesArray[index])
                  ? MongooseTypes.ObjectId(valuesArray[index])
                  : makeCaseInsensitiveRegex(valuesArray[index]),
              }),
            [] as ReadonlyArray<Record<string, any>>
          ),
        };
      },
      false: () => ({
        // Since mongoose-sanitize remove every dot from query, client should use ">" instead,
        // when intend to search for a nested object key
        // Transforms field>nestedField1>..>nestedFieldN to field.nestedField1.nestedFieldN
        [queryKey.replace(/>/g, '.')]: makeCaseInsensitiveRegex(value),
      }),
    };

    return { ...acc, ...mapValue[String(queryKey.includes('|')) as 'true' | 'false']() };
  }, {});

export interface RangeKey {
  /**
   * The name of the key to be formatted, if the query object does not contain this key, it will be ignored
   */
  name: string;
  /**
   * The compensation for the higher limit, because it comparison is done using "less than",
   * The default value is 1
   */
  accuracy?: number;
  /**
   * The element to be used to split the range range, and determine the limit start and end,
   * the default value is " to "
   */
  splitter?: string;
  /**
   * The type of this data, it can be a number or date,
   * The default value is date
   */
  dataType?: 'date' | 'number';
}

/**
 * @description Apply for each specified key a range query that can be understandable by MongoBd,
 * if the specified key don't exist in the query object it will be ignored
 * In case of numbers if one of the specified limit is invalid, it will be replaced by zero (0)
 * In case of dates if one of the specified limit is invalid, this limit will not be applied to
 * @param query The object to format, which contains the keys specified in rangeKeys argument
 * @param rangeKeys An array of params to be applied to the query formatting
 * @returns An object with specified keys formatted to mongodb range
 */
export function formatQueryToRange<T>(query: Record<string, any>, rangeKeys: RangeKey[]) {
  return rangeKeys.reduce<T>((acc: T, rangeKey: RangeKey) => {
    const value = query[rangeKey.name];
    if (typeof value !== 'string' || !value?.includes(rangeKey.splitter ?? ' to '))
      return { ...query, ...acc };

    const [startFrom, endTo] = value.split(rangeKey.splitter ?? ' to ');

    const mapValue = {
      number: () => ({
        $gte: Number(startFrom) || 0,
        $lt: Number(endTo) + (rangeKey.accuracy ?? 1) || 0,
      }),
      date: () => {
        const result = {} as Record<string, any>;
        if (new Date(startFrom).getDate()) {
          result.$gte = new Date(startFrom);
        }
        const dateAdded = addDays(new Date(endTo), rangeKey.accuracy ?? 1);
        if (dateAdded) {
          result.$lt = dateAdded;
        }
        return result;
      },
    };

    const { [rangeKey.name]: keyToBeRemoved, ...filteredQuery } = query;

    return {
      ...filteredQuery,
      ...acc,
      // If the specified key contains ">", it will be replaced by dot "."
      [rangeKey.name.replace(/>/g, '.')]: mapValue[rangeKey.dataType ?? 'date'](),
    } as T;
  }, {} as T);
}

export interface PrimitiveKey {
  /**
   * The name of the key to be formatted, if the query object does not contain this key, it will be ignored
   */
  name: string;
  /**
   * The type to parse the query value to
   */
  parseTo: 'number' | 'boolean' | 'array' | 'object';
}

/**
 * @description Parse a query value to specified dataType
 * @param query The object to format, which contains the keys specified in keys argument
 * @param keys An array of {PrimitiveKey} options to be applied to the query formatting
 * @returns An object with the specified keys values parsed
 */
export function formatQueryToPrimitiveValues<T>(query: Record<string, any>, keys: PrimitiveKey[]) {
  return keys.reduce<T>((acc: T, primitiveKey: PrimitiveKey) => {
    const value = query[primitiveKey.name];
    if (typeof value !== 'string') return { ...query, ...acc };

    const mapValue = {
      number: safeParseFloat,
      boolean: safeParseBoolean,
    } as Record<string, Function>;

    return {
      ...query,
      ...acc,
      [primitiveKey.name]: mapValue[primitiveKey.parseTo]
        ? mapValue[primitiveKey.parseTo](value)
        : safeParseObject(value, primitiveKey.parseTo as 'array' | 'object'),
    } as T;
  }, {} as T);
}
