import {combineLatest} from 'rxjs/observable/combineLatest';
import {ObjectCollection, ObjectContent, ObjectForEachCallback} from '../../typings';
import getObjectKeysAndValues from '../../utils/getObjectKeysAndValues';

export default
function filterObjectCollectionHelper(collection: ObjectContent<any>, callback: ObjectForEachCallback<any>): ObjectCollection<any> {
  const [keys, elements] = getObjectKeysAndValues(collection);

  return combineLatest(elements, (...values: any[]) => {
    const result: ObjectContent<any> = {};

    for (let i = 0, len = values.length; i < len; i++) { // tslint:disable-line:no-increment-decrement
      if (!callback(values[i], keys[i], collection)) {
        continue;
      }

      result[keys[i]] = elements[i];
    }

    return result;
  });
}
