import {mergeMap} from 'rxjs/operator/mergeMap';
import {ObjectCollection, ObjectContent, ObjectForEachCallback} from '../typings';
import filterObjectCollectionHelper from './helpers/filterObjectCollectionHelper';

export default function filterObjectCollection(this: ObjectCollection<any>, callback: ObjectForEachCallback<any>): ObjectCollection<any> {
  return mergeMap.call(
    this,
    (collection: ObjectContent<any>) => filterObjectCollectionHelper(collection, callback),
  );
}
