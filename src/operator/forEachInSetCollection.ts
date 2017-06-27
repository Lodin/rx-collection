import {_do} from 'rxjs/operator/do';
import {SetCollection, SetContent, SetForEachCallback} from '../typings';
import forEachInSetCollectionHelper from './helpers/forEachInSetCollectionHelper';

export default function forEachInSetCollection<T>(this: SetCollection<T>, callback: SetForEachCallback<T>): SetCollection<T> {
  return _do.call(
    this,
    (collection: SetContent<T>) => {
      forEachInSetCollectionHelper(collection, callback);
    },
  );
}
