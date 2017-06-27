import {Observable} from 'rxjs/Observable';
import {mergeMap} from 'rxjs/operator/mergeMap';
import {SetCheckCallback, SetCollection, SetContent} from '../typings';
import findInSetCollectionHelper from './helpers/findInSetCollectionHelper';

export default function findInSetCollection<T>(this: SetCollection<T>, callback: SetCheckCallback<T>): Observable<T> {
  return mergeMap.call(
    this,
    (collection: SetContent<T>) => findInSetCollectionHelper(collection, callback),
  );
}
