import {mergeMap} from 'rxjs/operator/mergeMap';
import {SetCheckCallback, SetCollection, SetContent} from '../typings';
import filterSetCollectionHelper from './helpers/filterSetCollectionHelper';

export default function filterSetCollection<T>(this: SetCollection<T>, callback: SetCheckCallback<T>): SetCollection<T> {
  return mergeMap.call(
    this,
    (collection: SetContent<T>) => filterSetCollectionHelper(collection, callback),
  );
}
