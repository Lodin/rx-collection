import {combineLatest} from 'rxjs/observable/combineLatest';
import {SetCheckCallback, SetCollection, SetContent} from '../../typings';

export default
function filterSetCollectionHelper<T>(collection: SetContent<T>, callback: SetCheckCallback<T>): SetCollection<T> {
  const elements = [...collection.values()];

  return combineLatest(elements, (...values: T[]) => {
    const result = new Set();

    for (let i = 0, len = values.length; i < len; i++) { // tslint:disable-line:no-increment-decrement
      if (!callback(values[i], i, collection)) {
        continue;
      }

      result.add(elements[i]);
    }

    return result;
  });
}
