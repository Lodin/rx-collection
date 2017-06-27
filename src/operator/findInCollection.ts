import * as isPlainObject from 'is-plain-object';
import {Observable} from 'rxjs/Observable';
import {mergeMap} from 'rxjs/operator/mergeMap';
import {
  ArrayCollection, ArrayForEachCallback,
  CommonForEachCallback,
  MapCollection, MapForEachCallback,
  ObjectCollection, ObjectForEachCallback,
  SetCollection, SetForEachCallback,
} from '../typings';
import findInArrayCollectionHelper from './helpers/findInArrayCollectionHelper';
import findInMapCollectionHelper from './helpers/findInMapCollectionHelper';
import findInObjectCollectionHelper from './helpers/findInObjectCollectionHelper';
import findInSetCollectionHelper from './helpers/findInSetCollectionHelper';

export default function findInCollection<K, T>(this: MapCollection<K, T>, callback: MapForEachCallback<K, T>): Observable<T>;
export default function findInCollection<T>(this: SetCollection<T>, callback: SetForEachCallback<T>): Observable<T>;
export default function findInCollection<T>(this: ArrayCollection<T>, callback: ArrayForEachCallback<T>): Observable<T>;
export default function findInCollection(this: ObjectCollection<any>, callback: ObjectForEachCallback<any>): Observable<any>;

export default function findInCollection(this: Observable<any>, callback: CommonForEachCallback<any, any, any>): Observable<any> {
  return mergeMap.call(
    this,
    (collection: any) => {
      if (Array.isArray(collection)) {
        return findInArrayCollectionHelper(collection, callback);
      } else if (isPlainObject(collection)) {
        return findInObjectCollectionHelper(collection, callback);
      } else if (collection instanceof Map) {
        return findInMapCollectionHelper(collection, callback);
      } else if (collection instanceof Set) {
        return findInSetCollectionHelper(collection, callback);
      } else {
        throw new TypeError('Unrecognized type of collection. Type should be "Array", "Object", "Map" or "Set"');
      }
    },
  );
}
