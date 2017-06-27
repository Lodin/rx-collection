import {Observable} from 'rxjs/Observable';
import {mergeMap} from 'rxjs/operator/mergeMap';
import {SetCollection, SetContent, SetForEachCallback} from '../typings';
import findInSetCollectionHelper from './helpers/findInSetCollectionHelper';

export default function findInSetCollection<T>(this: SetCollection<T>, callback: SetForEachCallback<T>): Observable<T> {
  return mergeMap.call(
    this,
    (collection: SetContent<T>) => findInSetCollectionHelper(collection, callback),
  );
}
