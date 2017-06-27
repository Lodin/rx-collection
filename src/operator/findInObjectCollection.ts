import {Observable} from 'rxjs/Observable';
import {mergeMap} from 'rxjs/operator/mergeMap';
import {ObjectCheckCallback, ObjectCollection, ObjectContent} from '../typings';
import findInObjectCollectionHelper from './helpers/findInObjectCollectionHelper';

export default function findInObjectCollection(this: ObjectCollection<any>, callback: ObjectCheckCallback<any>): Observable<any> {
  return mergeMap.call(
    this,
    (collection: ObjectContent<any>) => findInObjectCollectionHelper(collection, callback),
  );
}
