import { convertSnakeToCamel } from "./string";

export function convertKeysSnakeToCamel(originObject: any): any {
  const convertedObject = {};

  for (const [key, value] of Object.entries(originObject)) {
    const camelCaseKey = convertSnakeToCamel(key);
    convertedObject[camelCaseKey] = value;
  }

  return convertedObject;
}
