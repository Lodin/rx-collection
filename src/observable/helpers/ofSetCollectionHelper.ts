import {Creator, SetContent} from '../../typings';

export default function ofSetCollectionHelper<T>(collection: Set<T>, creator: Creator<T>): SetContent<T> {
  const result: SetContent<T> = new Set();

  for (const element of collection) {
    result.add(creator(element));
  }

  return result;
}
