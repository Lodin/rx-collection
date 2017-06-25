import {mergeMap} from 'rxjs/operator/mergeMap';
import {ArrayCheckCallback, ArrayCollection, ArrayContent} from '../typings';
import filterArrayCollectionHelper from './helpers/filterArrayCollectionHelper';

export default function filterArrayCollection<T>(this: ArrayCollection<T>, callback: ArrayCheckCallback<T>): ArrayCollection<T> {
  return mergeMap.call(
    this,
    (collection: ArrayContent<T>) => filterArrayCollectionHelper(collection, callback),
  );
}
