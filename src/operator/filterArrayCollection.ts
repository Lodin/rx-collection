import {mergeMap} from 'rxjs/operator/mergeMap';
import {ArrayCollection, ArrayContent, ArrayForEachCallback} from '../typings';
import filterArrayCollectionHelper from './helpers/filterArrayCollectionHelper';

export default function filterArrayCollection<T>(this: ArrayCollection<T>, callback: ArrayForEachCallback<T>): ArrayCollection<T> {
  return mergeMap.call(
    this,
    (collection: ArrayContent<T>) => filterArrayCollectionHelper(collection, callback),
  );
}
