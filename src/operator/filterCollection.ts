import {Observable} from 'rxjs/Observable';
import {mergeMap} from 'rxjs/operator/mergeMap';
import {combineLatest} from 'rxjs/observable/combineLatest';
import {
  ArrayCollection,
  ArrayContent,
  MapCollection,
  MapContent,
  ObjectCollection,
  ObjectContent,
  SetCollection,
  SetContent
} from '../typings';
import * as isPlainObject from 'is-plain-object';

export type FilterCallback<T, K, C> = (value: T, index: K, collection: C) => boolean;

export type MapFilterCallback<K, T> = FilterCallback<T, K, MapContent<K, T>>;
export type SetFilterCallback<T> = FilterCallback<T, number, SetContent<T>>;
export type ArrayFilterCallback<T> = FilterCallback<T, number, ArrayContent<T>>;
export type ObjectFilterCallback<T> = FilterCallback<T, string, ObjectContent<T>>;

export default function filterCollection<K, T>(this: MapCollection<K, T>, callback: MapFilterCallback<K, T>): MapCollection<K, T>;
export default function filterCollection<T>(this: SetCollection<T>, callback: SetFilterCallback<T>): SetCollection<T>;
export default function filterCollection<T>(this: ArrayCollection<T>, callback: ArrayFilterCallback<T>): ArrayCollection<T>;
export default function filterCollection(this: ObjectCollection<any>, callback: ObjectFilterCallback<any>): ObjectCollection<any>

export default function filterCollection(this: Observable<any>, callback: FilterCallback<any, any, any>): Observable<any> {
  return mergeMap.call(
    this,
    (collection: any) => {
      if (Array.isArray(collection)) {
        return filterArrayCollection(collection, callback);
      } else if (isPlainObject(collection)) {
        return filterObjectCollection(collection, callback);
      } else if (collection instanceof Map) {
        return filterMapCollection(collection, callback);
      } else if (collection instanceof Set) {
        return filterSetCollection(collection, callback);
      } else {
        throw new TypeError('Unrecognized type of collection. Type should be "Array", "Object", "Map" or "Set"');
      }
    }
  )
}

function filterMapCollection<K, T>(collection: MapContent<K, T>, callback: MapFilterCallback<K, T>): MapCollection<K, T> {
  const keys = [...collection.keys()];
  const elements = [...collection.values()];

  return combineLatest.call(Observable, elements, (...values: T[]) => {
    const result = new Map();

    for (let i = 0, len = values.length; i < len; i++) { // tslint:disable-line:no-increment-decrement
      if (!callback(values[i], keys[i], collection)) {
        continue;
      }

      result.set(keys[i], elements[i]);
    }

    return result;
  });
}

function filterSetCollection<T>(collection: SetContent<T>, callback: SetFilterCallback<T>): SetCollection<T> {
  const elements = [...collection.values()];

  return combineLatest.call(Observable, elements, (...values: T[]) => {
    const result = new Set();

    for (let i = 0, len = values.length; i < len; i++) { // tslint:disable-line:no-increment-decrement
      if (!callback(values[i], i, collection)) {
        continue;
      }

      result.add(elements[i]);
    }

    return result;
  });
}

function filterArrayCollection<T>(collection: ArrayContent<T>, callback: ArrayFilterCallback<T>): ArrayCollection<T> {
  return combineLatest.call(Observable, collection, (...values: T[]) => {
    const result = [];

    for (let i = 0, len = values.length; i < len; i++) { // tslint:disable-line:no-increment-decrement
      if (!callback(values[i], i, collection)) {
        continue;
      }

      result.push(collection[i]);
    }

    return result;
  });
}

function filterObjectCollection(collection: ObjectContent<any>, callback: ObjectFilterCallback<any>): ObjectCollection<any> {
  const keys = Object.keys(collection);

  let elements = new Array(keys.length);
  for (let i = 0, len = keys.length; i < len; i++) { // tslint:disable-line:no-increment-decrement
    elements[i] = collection[keys[i]];
  }

  return combineLatest.call(Observable, elements, (...values: any[]) => {
    const result: ObjectContent<any> = {};

    for (let i = 0, len = values.length; i < len; i++) { // tslint:disable-line:no-increment-decrement
      if (!callback(values[i], keys[i], collection)) {
        continue;
      }

      result[keys[i]] = elements[i];
    }

    return result;
  });
}
