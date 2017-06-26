import {Observable} from 'rxjs/Observable';
import {mergeMap} from 'rxjs/operator/mergeMap';
import {ArrayCheckCallback, ArrayCollection, ArrayContent} from '../typings';
import findInArrayCollectionHelper from './helpers/findInArrayCollectionHelper';

export default function findInArrayCollection<T>(this: ArrayCollection<T>, callback: ArrayCheckCallback<T>): Observable<T> {
  return mergeMap.call(
    this,
    (collection: ArrayContent<T>) => findInArrayCollectionHelper(collection, callback),
  );
}
