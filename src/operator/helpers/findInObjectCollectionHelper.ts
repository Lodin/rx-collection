import {Observable} from 'rxjs/Observable';
import {combineLatest} from 'rxjs/observable/combineLatest';
import {mergeMap} from 'rxjs/operator/mergeMap';
import {ObjectContent, ObjectForEachCallback} from '../../typings';
import getObjectKeysAndValues from '../../utils/getObjectKeysAndValues';
import {checkForNothing, nothing} from './nothing';

export default
function findInObjectCollectionHelper(collection: ObjectContent<any>, callback: ObjectForEachCallback<any>): Observable<any> {
  const [keys, elements] = getObjectKeysAndValues(collection);

  return mergeMap.call(
    combineLatest(elements, (...values: any[]) => {
      for (let i = 0, len = values.length; i < len; i++) { // tslint:disable-line:no-increment-decrement
        if (!callback(values[i], keys[i], collection)) {
          continue;
        }

        return values[i];
      }

      return nothing;
    }),
    checkForNothing,
  );
}
