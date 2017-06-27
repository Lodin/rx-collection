import {combineLatest} from 'rxjs/observable/combineLatest';
import {MapCollection, MapContent, MapForEachCallback} from '../../typings';

export default
function filterMapCollectionHelper<K, T>(collection: MapContent<K, T>, callback: MapForEachCallback<K, T>): MapCollection<K, T> {
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
