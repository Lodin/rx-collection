import {Observable} from 'rxjs/Observable';
import {combineLatest} from 'rxjs/observable/combineLatest';
import {mergeMap} from 'rxjs/operator/mergeMap';
import {MapContent, MapForEachCallback} from '../../typings';
import {checkForNothing, nothing} from './nothing';

export default
function findInMapCollectionHelper<K, T>(collection: MapContent<K, T>, callback: MapForEachCallback<K, T>): Observable<T> {
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
    checkForNothing,
  );
}
