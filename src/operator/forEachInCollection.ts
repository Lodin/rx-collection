import * as isPlainObject from 'is-plain-object';
import {Observable} from 'rxjs/Observable';
import {_do} from 'rxjs/operator/do';
import {
  ArrayCollection, ArrayForEachCallback,
  CommonForEachCallback,
  MapCollection, MapForEachCallback,
  ObjectCollection, ObjectForEachCallback,
  SetCollection, SetForEachCallback,
} from '../typings';
import forEachInArrayCollectionHelper from './helpers/forEachInArrayCollectionHelper';
import forEachInMapCollectionHelper from './helpers/forEachInMapCollectionHelper';
import forEachInObjectCollectionHelper from './helpers/forEachInObjectCollectionHelper';
import forEachInSetCollectionHelper from './helpers/forEachInSetCollectionHelper';

export default function forEachInCollection<K, T>(this: MapCollection<K, T>, callback: MapForEachCallback<K, T>): MapCollection<K, T>;
export default function forEachInCollection<T>(this: SetCollection<T>, callback: SetForEachCallback<T>): SetCollection<T>;
export default function forEachInCollection<T>(this: ArrayCollection<T>, callback: ArrayForEachCallback<T>): ArrayCollection<T>;
export default function forEachInCollection(this: ObjectCollection<any>, callback: ObjectForEachCallback<any>): ObjectCollection<any>;

export default function forEachInCollection(this: Observable<any>, callback: CommonForEachCallback<any, any, any>): Observable<any> {
  return _do.call(
    this,
    (collection: any) => {
      if (Array.isArray(collection)) {
        forEachInArrayCollectionHelper(collection, callback);
      } else if (isPlainObject(collection)) {
        forEachInObjectCollectionHelper(collection, callback);
      } else if (collection instanceof Map) {
        forEachInMapCollectionHelper(collection, callback);
      } else if (collection instanceof Set) {
        forEachInSetCollectionHelper(collection, callback);
      } else {
        throw new TypeError('Unrecognized type of collection. Type should be "Array", "Object", "Map" or "Set"');
      }
    },
  );
}
