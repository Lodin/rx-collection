import {combineLatest} from 'rxjs/observable/combineLatest';
import {ArrayCheckCallback, ArrayCollection, ArrayContent} from '../../typings';

export default
function filterArrayCollectionHelper<T>(collection: ArrayContent<T>, callback: ArrayCheckCallback<T>): ArrayCollection<T> {
  return combineLatest(collection, (...values: T[]) => {
    const result = [];

    for (let i = 0, len = values.length; i < len; i++) { // tslint:disable-line:no-increment-decrement
      if (!callback(values[i], i, collection)) {
        continue;
      }

      result.push(collection[i]);
    }

    return result;
  });
}
