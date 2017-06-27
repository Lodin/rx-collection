import {ArrayContent, Creator} from '../../typings';

export default function ofArrayCollectionHelper<T>(collection: T[], creator: Creator<T>): ArrayContent<T> {
  const result: ArrayContent<T> = new Array(collection.length);

  for (let i = 0, len = collection.length; i < len; i++) { // tslint:disable-line:no-increment-decrement
    result[i] = creator(collection[i]);
  }

  return result;
}
