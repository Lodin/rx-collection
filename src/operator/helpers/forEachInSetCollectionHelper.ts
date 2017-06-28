import {combineLatest} from 'rxjs/observable/combineLatest';
import {SetContent, SetForEachCallback} from '../../typings';

export default function forEachInSetCollectionHelper<T>(collection: SetContent<T>, callback: SetForEachCallback<T>): void {
  const elements = [...collection.values()];

  combineLatest(elements).subscribe((values: T[]) => {
    for (let i = 0, len = values.length; i < len; i++) { // tslint:disable-line:no-increment-decrement
      callback(values[i], i, collection);
    }
  });
}
