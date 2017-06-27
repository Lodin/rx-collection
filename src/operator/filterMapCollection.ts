import {mergeMap} from 'rxjs/operator/mergeMap';
import {MapCollection, MapContent, MapForEachCallback} from '../typings';
import filterMapCollectionHelper from './helpers/filterMapCollectionHelper';

export default function filterMapCollection<K, T>(this: MapCollection<K, T>, callback: MapForEachCallback<K, T>): MapCollection<K, T> {
  return mergeMap.call(
    this,
    (collection: MapContent<K, T>) => filterMapCollectionHelper(collection, callback),
  );
}
