import * as isPlainObject from 'is-plain-object';
import {Observable} from 'rxjs/Observable';
import {mergeMap} from 'rxjs/operator/mergeMap';
import {combineLatest} from 'rxjs/observable/combineLatest';
import {
  ArrayCheckCallback, ArrayCollection, ArrayContent,
  CheckCallback,
  MapCheckCallback, MapCollection, MapContent,
  ObjectCheckCallback, ObjectCollection, ObjectContent,
  SetCheckCallback, SetCollection, SetContent,
} from '../typings';
import getObjectKeysAndValues from '../utils/getObjectKeysAndValues';

export default function filterCollection<K, T>(this: MapCollection<K, T>, callback: MapCheckCallback<K, T>): MapCollection<K, T>;
export default function filterCollection<T>(this: SetCollection<T>, callback: SetCheckCallback<T>): SetCollection<T>;
export default function filterCollection<T>(this: ArrayCollection<T>, callback: ArrayCheckCallback<T>): ArrayCollection<T>;
export default function filterCollection(this: ObjectCollection<any>, callback: ObjectCheckCallback<any>): ObjectCollection<any>

export default function filterCollection(this: Observable<any>, callback: CheckCallback<any, any, any>): Observable<any> {
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
    },
  )
}

function filterMapCollection<K, T>(collection: MapContent<K, T>, callback: MapCheckCallback<K, T>): MapCollection<K, T> {
  const keys = collection.keys();
  const elements = [...collection.values()];

  return combineLatest(elements, (...values: T[]) => {
    const result = new Map();

    for (let i = 0, len = values.length; i < len; i++) { // tslint:disable-line:no-increment-decrement
      const key = keys.next().value;

      if (!callback(values[i], key, collection)) {
        continue;
      }

      result.set(key, elements[i]);
    }

    return result;
  });
}

function filterSetCollection<T>(collection: SetContent<T>, callback: SetCheckCallback<T>): SetCollection<T> {
  const elements = [...collection.values()];

  return combineLatest(elements, (...values: T[]) => {
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

function filterArrayCollection<T>(collection: ArrayContent<T>, callback: ArrayCheckCallback<T>): ArrayCollection<T> {
  return combineLatest(collection, (...values: T[]) => {
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

function filterObjectCollection(collection: ObjectContent<any>, callback: ObjectCheckCallback<any>): ObjectCollection<any> {
  const [keys, elements] = getObjectKeysAndValues(collection);

  return combineLatest(elements, (...values: any[]) => {
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
