import {Observable} from 'rxjs/Observable';
import {mergeMap} from 'rxjs/operator/mergeMap';
import {ObjectCollection, ObjectContent, ObjectForEachCallback} from '../typings';
import findInObjectCollectionHelper from './helpers/findInObjectCollectionHelper';

export default function findInObjectCollection(this: ObjectCollection<any>, callback: ObjectForEachCallback<any>): Observable<any> {
  return mergeMap.call(
    this,
    (collection: ObjectContent<any>) => findInObjectCollectionHelper(collection, callback),
  );
}
