import { convertSnakeToCamel } from "./string";

const objectConstructor = {}.constructor;
const arrayConstructor = [].constructor;

export function isObject(obj: any): obj is Object {
  return obj && obj.constructor === objectConstructor;
}

export function isArray(obj: any): obj is any[] {
  return obj && obj.constructor === arrayConstructor;
}

export function convertKeysSnakeToCamel(originObject: any): any {
  const convertedObject = {};

  for (const [key, value] of Object.entries(originObject)) {
    const camelCaseKey = convertSnakeToCamel(key);

    convertedObject[camelCaseKey] = isArray(value)
      ? value.map((v) => convertKeysSnakeToCamel(v))
      : isObject(value)
      ? convertKeysSnakeToCamel(value)
      : value;
  }

  return convertedObject;
}
