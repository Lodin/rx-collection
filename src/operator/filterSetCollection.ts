import {mergeMap} from 'rxjs/operator/mergeMap';
import {SetCollection, SetContent, SetForEachCallback} from '../typings';
import filterSetCollectionHelper from './helpers/filterSetCollectionHelper';

export default function filterSetCollection<T>(this: SetCollection<T>, callback: SetForEachCallback<T>): SetCollection<T> {
  return mergeMap.call(
    this,
    (collection: SetContent<T>) => filterSetCollectionHelper(collection, callback),
  );
}
