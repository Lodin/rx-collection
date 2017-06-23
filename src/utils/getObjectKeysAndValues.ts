// tslint:disable:no-for-in

const has = Object.prototype.hasOwnProperty;
const isEnumerable = Object.prototype.propertyIsEnumerable;

export default function getObjectKeysAndValues<T>(obj: {[key: string]: T}): [string[], T[]] {
  const keys = [];
  const values = [];

  for (const key in obj) {
    if (has.call(obj, key) && isEnumerable.call(obj, key)) {
      keys.push(key);
      values.push(obj[key]);
    }
  }

  return [keys, values];
}
