import {
  ApiErrorsI18nCode,
  ApiErrorsName,
  ApiErrorsStatusCode,
  ApiErrorsType,
} from '../constants/errors';

export interface ICustomError {
  /**
   * The Http status code, for this response.
   */
  statusCode: ApiErrorsStatusCode;
  /**
   * The name of the error, eg.: DUPLICATE_KEY; MISSING_FIELDS ...
   */
  name: ApiErrorsName;
  /**
   * The type of this error, eg.: VALIDATION_ERROR; AUTHORIZATION_ERROR ...
   */
  type: ApiErrorsType;
  /**
   * The message of this error in the default locale (pt-PT)
   */
  message: string;
  /**
   * The code to be used in front-end which refers to the key of this message in translation document (api-server.json)
   * It should follow this regex pattern (S|W|E)-[0-9]{4,}
   * S for success messages; W for warning messages; and E for error messages
   * eg.: E-10456; W-11208; S-12354
   */
  i18nCode: ApiErrorsI18nCode;
  /**
   * The hierarchy of dir/file names where this error occurred
   */
  stack: string;
  /**
   * Details will be an object with unknown properties, and it will be only for develop eyes, so its messages don't need to be translated (be included in i18n approach )
   */
  details: Record<string, unknown>;
}

class CustomError extends Error implements ICustomError {
  statusCode: ApiErrorsStatusCode;

  name: ApiErrorsName;

  type: ApiErrorsType;

  message: string;

  i18nCode: ApiErrorsI18nCode;

  stack: string;

  details: Record<string, unknown>;

  constructor(props: ICustomError) {
    super(props.message);
    this.statusCode = props.statusCode;
    this.name = props.name;
    this.type = props.type;
    this.message = props.message;
    this.i18nCode = props.i18nCode;
    this.stack = props.stack;
    this.details = props.details;
  }
}

export default CustomError;
