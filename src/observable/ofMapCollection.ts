import {of} from 'rxjs/observable/of';
import {Creator, MapCollection} from '../typings';
import ofMapCollectionHelper from './helpers/ofMapCollectionHelper';

export default function ofMapCollection<K, T>(collection: Map<K, T>, creator: Creator<T> = of): MapCollection<K, T> {
  return of(ofMapCollectionHelper(collection, creator));
}
