import {_do} from 'rxjs/operator/do';
import {ObjectCollection, ObjectContent, ObjectForEachCallback} from '../typings';
import forEachInObjectCollectionHelper from './helpers/forEachInObjectCollectionHelper';

export default
function forEachInObjectCollection(this: ObjectCollection<any>, callback: ObjectForEachCallback<any>): ObjectCollection<any> {
  return _do.call(
    this,
    (collection: ObjectContent<any>) => {
      forEachInObjectCollectionHelper(collection, callback);
    },
  );
}
