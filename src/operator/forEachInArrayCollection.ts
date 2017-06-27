import {_do} from 'rxjs/operator/do';
import {ArrayCollection, ArrayContent, ArrayForEachCallback} from '../typings';
import forEachInArrayCollectionHelper from './helpers/forEachInArrayCollectionHelper';

export default function forEachInArrayCollection<T>(this: ArrayCollection<T>, callback: ArrayForEachCallback<T>): ArrayCollection<T> {
  return _do.call(
    this,
    (collection: ArrayContent<T>) => {
      forEachInArrayCollectionHelper(collection, callback);
    },
  );
}
