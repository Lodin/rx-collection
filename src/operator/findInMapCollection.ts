import {Observable} from 'rxjs/Observable';
import {mergeMap} from 'rxjs/operator/mergeMap';
import {MapCheckCallback, MapCollection, MapContent} from '../typings';
import findInMapCollectionHelper from './helpers/findInMapCollectionHelper';

export default function findInMapCollection<K, T>(this: MapCollection<K, T>, callback: MapCheckCallback<K, T>): Observable<T> {
  return mergeMap.call(
    this,
    (collection: MapContent<K, T>) => findInMapCollectionHelper(collection, callback),
  );
}
