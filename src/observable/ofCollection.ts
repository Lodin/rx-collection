import * as isPlainObject from 'is-plain-object';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';

export type ObjectCollection<T> = {[key: string]: T};
export type Creator<T> = (value: T) => Observable<T>;

export default function ofCollection<K, T>(collection: Map<K, T>, creator?: Creator<T>): Observable<Map<K, Observable<T>>>;
export default function ofCollection<T>(collection: Set<T>, creator?: Creator<T>): Observable<Set<Observable<T>>>;
export default function ofCollection<T>(collection: T[], creator?: Creator<T>): Observable<Observable<T>[]>;
export default function ofCollection(collection: ObjectCollection<any>, creator?: Creator<any>): Observable<ObjectCollection<Observable<any>>>;

export default function ofCollection(collection: any, creator: Creator<any> = of): any {
  let result: any;

  if (Array.isArray(collection)) {
    result = prepareArrayCollection(collection, creator);
  } else if (isPlainObject(collection)) {
    result = prepareObjectCollection(collection, creator);
  } else if (collection instanceof Map) {
    result = prepareMapCollection(collection, creator);
  } else if (collection instanceof Set) {
    result = prepareSetCollection(collection, creator);
  } else {
    throw new TypeError('Unrecognized type of collection. Type should be "Array", "Object", "Map" or "Set"');
  }

  return of.call(Observable, result);
}

function prepareArrayCollection<T>(collection: T[], creator: Creator<T>): Observable<T>[] {
  const result = new Array<Observable<T>>(collection.length);

  for (let i = 0, len = collection.length; i < len; i++) { // tslint:disable-line:no-increment-decrement
    result[i] = creator(collection[i]);
  }

  return result;
}

function prepareObjectCollection(collection: ObjectCollection<any>, creator: Creator<any>): ObjectCollection<Observable<any>> {
  const result: ObjectCollection<Observable<any>> = {};

  for (const key of Object.keys(collection)) {
    result[key] = creator(collection[key]);
  }

  return result;
}

function prepareMapCollection<K, T>(collection: Map<K, T>, creator: Creator<T>): Map<K, Observable<T>> {
  const result = new Map();

  for (const [key, value] of collection) {
    result.set(key, creator(value));
  }

  return result;
}

function prepareSetCollection<T>(collection: Set<T>, creator: Creator<T>): Set<Observable<T>> {
  const result = new Set();

  for (const element of collection) {
    result.add(creator(element));
  }

  return result;
}
