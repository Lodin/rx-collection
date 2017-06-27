import {Observable} from 'rxjs/Observable';
import {combineLatest} from 'rxjs/observable/combineLatest';
import {mergeMap} from 'rxjs/operator/mergeMap';
import {ArrayCheckCallback, ArrayContent} from '../../typings';
import {checkForNothing, nothing} from './nothing';

export default
function findInArrayCollectionHelper<T>(collection: ArrayContent<T>, callback: ArrayCheckCallback<T>): Observable<T> {
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
    checkForNothing,
  );
}
