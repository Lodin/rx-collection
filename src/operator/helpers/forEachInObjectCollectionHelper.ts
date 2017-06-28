import {combineLatest} from 'rxjs/observable/combineLatest';
import {ObjectContent, ObjectForEachCallback} from '../../typings';
import getObjectKeysAndValues from '../../utils/getObjectKeysAndValues';

export default function forEachInObjectCollectionHelper(collection: ObjectContent<any>, callback: ObjectForEachCallback<any>): void {
  const [keys, elements] = getObjectKeysAndValues(collection);

  combineLatest(elements).subscribe((values: any[]) => {
    for (let i = 0, len = values.length; i < len; i++) { // tslint:disable-line:no-increment-decrement
      callback(values[i], keys[i], collection);
    }
  });
}
