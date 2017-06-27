import {combineLatest} from 'rxjs/observable/combineLatest';
import {ArrayContent, ArrayForEachCallback} from '../../typings';

export default function forEachInArrayCollectionHelper<T>(collection: ArrayContent<T>, callback: ArrayForEachCallback<T>): void {
  combineLatest(collection, (...values: T[]) => {
    for (let i = 0, len = values.length; i < len; i++) { // tslint:disable-line:no-increment-decrement
      callback(values[i], i, collection);
    }
  });
}
