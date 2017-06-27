import {_do} from 'rxjs/operator/do';
import {MapCollection, MapContent, MapForEachCallback} from '../typings';
import forEachInMapCollectionHelper from './helpers/forEachInMapCollectionHelper';

export default function forEachInMapCollection<K, T>(this: MapCollection<K, T>, callback: MapForEachCallback<K, T>): MapCollection<K, T> {
  return _do.call(
    this,
    (collection: MapContent<K, T>) => {
      forEachInMapCollectionHelper(collection, callback);
    },
  );
}
