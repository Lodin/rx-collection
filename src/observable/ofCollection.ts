import * as isPlainObject from 'is-plain-object';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {ArrayCollection, MapCollection, ObjectCollection, SetCollection} from '../typings';

export type Creator<T> = (value: T) => Observable<T>;

export default function ofCollection<K, T>(collection: Map<K, T>, creator?: Creator<T>): MapCollection<K, T>;
export default function ofCollection<T>(collection: Set<T>, creator?: Creator<T>): SetCollection<T>;
export default function ofCollection<T>(collection: T[], creator?: Creator<T>): ArrayCollection<T>;
export default function ofCollection(collection: {[key: string]: any}, creator?: Creator<any>): ObjectCollection<any>;

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

function prepareObjectCollection(collection: {[key: string]: any}, creator: Creator<any>): {[key: string]: Observable<any>} {
  const result: {[key: string]: Observable<any>} = {};

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
