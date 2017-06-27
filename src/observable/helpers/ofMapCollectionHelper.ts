import {Creator, MapContent} from '../../typings';

export default function ofMapCollectionHelper<K, T>(collection: Map<K, T>, creator: Creator<T>): MapContent<K, T> {
  const result: MapContent<K, T> = new Map();

  for (const [key, value] of collection) {
    result.set(key, creator(value));
  }

  return result;
}
