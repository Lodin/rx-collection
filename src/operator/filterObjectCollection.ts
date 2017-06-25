import {mergeMap} from 'rxjs/operator/mergeMap';
import {ObjectCheckCallback, ObjectCollection, ObjectContent} from '../typings';
import filterObjectCollectionHelper from './helpers/filterObjectCollectionHelper';

export default function filterObjectCollection(this: ObjectCollection<any>, callback: ObjectCheckCallback<any>): ObjectCollection<any> {
  return mergeMap.call(
    this,
    (collection: ObjectContent<any>) => filterObjectCollectionHelper(collection, callback),
  );
}
