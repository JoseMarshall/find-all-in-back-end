export const pageQueryRegex = /^[1-9]+[0-9]*$/;
export const limitQueryRegex = /^[0-9]+$/;
export const floatNumberRegex = /^-{0,1}\d+(\.\d+|\d*)$/;
export const sortByStringfiedRegex =
  /^\{("\w+":(?!\s)(1|-1)(?!")((,"\w+":(?!\s)(1|-1)(?!"))+|))+\}$/;
export const dateRangeRegex =
  /^(\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}\.\d{3}Z){0,1}){0,1} to (\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}\.\d{3}Z){0,1}){0,1}$/;
