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
import filterArrayCollectionHelper from './helpers/filterArrayCollectionHelper';
import filterMapCollectionHelper from './helpers/filterMapCollectionHelper';
import filterObjectCollectionHelper from './helpers/filterObjectCollectionHelper';
import filterSetCollectionHelper from './helpers/filterSetCollectionHelper';

export default function filterCollection<K, T>(this: MapCollection<K, T>, callback: MapForEachCallback<K, T>): MapCollection<K, T>;
export default function filterCollection<T>(this: SetCollection<T>, callback: SetForEachCallback<T>): SetCollection<T>;
export default function filterCollection<T>(this: ArrayCollection<T>, callback: ArrayForEachCallback<T>): ArrayCollection<T>;
export default function filterCollection(this: ObjectCollection<any>, callback: ObjectForEachCallback<any>): ObjectCollection<any>;

export default function filterCollection(this: Observable<any>, callback: CommonForEachCallback<any, any, any>): Observable<any> {
  return mergeMap.call(
    this,
    (collection: any) => {
      if (Array.isArray(collection)) {
        return filterArrayCollectionHelper(collection, callback);
      } else if (isPlainObject(collection)) {
        return filterObjectCollectionHelper(collection, callback);
      } else if (collection instanceof Map) {
        return filterMapCollectionHelper(collection, callback);
      } else if (collection instanceof Set) {
        return filterSetCollectionHelper(collection, callback);
      } else {
        throw new TypeError('Unrecognized type of collection. Type should be "Array", "Object", "Map" or "Set"');
      }
    },
  );
}
