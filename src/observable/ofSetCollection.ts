import {of} from 'rxjs/observable/of';
import {Creator, SetCollection} from '../typings';
import ofSetCollectionHelper from './helpers/ofSetCollectionHelper';

export default function ofSetCollection<T>(collection: Set<T>, creator: Creator<T> = of): SetCollection<T> {
  return of(ofSetCollectionHelper(collection, creator));
}
