import {combineLatest} from 'rxjs/observable/combineLatest';
import {MapContent, MapForEachCallback} from '../../typings';

export default function forEachInMapCollectionHelper<K, T>(collection: MapContent<K, T>, callback: MapForEachCallback<K, T>): void {
  const keys = collection.keys();
  const elements = [...collection.values()];

  combineLatest(elements).subscribe((values: T[]) => {
    for (let i = 0, len = values.length; i < len; i++) { // tslint:disable-line:no-increment-decrement
      callback(values[i], keys.next().value, collection);
    }
  });
}
