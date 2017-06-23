import * as isPlainObject from 'is-plain-object';
import {Observable} from 'rxjs/Observable';
import {empty} from 'rxjs/observable/empty';
import {of} from 'rxjs/observable/of';
import {mergeMap} from 'rxjs/operator/mergeMap';
import {combineLatest} from 'rxjs/observable/combineLatest';
import {
  ArrayCheckCallback, ArrayCollection, ArrayContent,
  CheckCallback,
  MapCheckCallback, MapCollection, MapContent,
  ObjectCheckCallback, ObjectCollection, ObjectContent,
  SetCheckCallback, SetCollection, SetContent
} from '../typings';
import getObjectKeysAndValues from '../utils/getObjectKeysAndValues';

const nothing = Symbol('empty');

function checkValue<T>(value: T|Symbol): Observable<T> {
  return value === nothing ? empty() : of(value);
}

export default function findInCollection<K, T>(this: MapCollection<K, T>, callback: MapCheckCallback<K, T>): Observable<T>;
export default function findInCollection<T>(this: SetCollection<T>, callback: SetCheckCallback<T>): Observable<T>;
export default function findInCollection<T>(this: ArrayCollection<T>, callback: ArrayCheckCallback<T>): Observable<T>;
export default function findInCollection(this: ObjectCollection<any>, callback: ObjectCheckCallback<any>): Observable<any>;

export default function findInCollection(this: Observable<any>, callback: CheckCallback<any, any, any>): Observable<any> {
  return mergeMap.call(
    this,
    (collection: any) => {
      if (Array.isArray(collection)) {
        return findInArrayCollection(collection, callback);
      } else if (isPlainObject(collection)) {
        return findInObjectCollection(collection, callback);
      } else if (collection instanceof Map) {
        return findInMapCollection(collection, callback);
      } else if (collection instanceof Set) {
        return findInSetCollection(collection, callback);
      } else {
        throw new TypeError('Unrecognized type of collection. Type should be "Array", "Object", "Map" or "Set"');
      }
    },
  );
}

function findInMapCollection<K, T>(collection: MapContent<K, T>, callback: MapCheckCallback<K, T>): Observable<T> {
  const keys = collection.keys();

  return mergeMap.call(
    combineLatest(...collection.values(), (...values: T[]) => {
      for (let i = 0, len = values.length; i < len; i++) { // tslint:disable-line:no-increment-decrement
        if (!callback(values[i], keys.next().value, collection)) {
          continue;
        }

        return values[i];
      }

      return nothing;
    }),
    checkValue,
  );
}

function findInSetCollection<T>(collection: SetContent<T>, callback: SetCheckCallback<T>): Observable<T> {
  return mergeMap.call(
    combineLatest(...collection.values(), (...values: T[]) => {
      for (let i = 0, len = values.length; i < len; i++) { // tslint:disable-line:no-increment-decrement
        if (!callback(values[i], i, collection)) {
          continue;
        }

        return values[i];
      }

      return nothing;
    }),
    checkValue,
  );
}

function findInArrayCollection<T>(collection: ArrayContent<T>, callback: ArrayCheckCallback<T>): Observable<T> {
  return mergeMap.call(
    combineLatest(collection, (...values: T[]) => {
      for (let i = 0, len = values.length; i < len; i++) { // tslint:disable-line:no-increment-decrement
        if (!callback(values[i], i, collection)) {
          continue;
        }

        return values[i];
      }

      return nothing;
    }),
    checkValue,
  );
}

function findInObjectCollection(collection: ObjectContent<any>, callback: ObjectCheckCallback<any>): Observable<any> {
  const [keys, elements] = getObjectKeysAndValues(collection);

  return mergeMap.call(
    combineLatest(elements, (...values: any[]) => {
      for (let i = 0, len = values.length; i < len; i++) { // tslint:disable-line:no-increment-decrement
        if (!callback(values[i], keys[i], collection)) {
          continue;
        }

        return values[i];
      }

      return nothing
    }),
    checkValue,
  );
}
