import {of} from 'rxjs/observable/of';
import {ArrayCollection, Creator} from '../typings';
import ofArrayCollectionHelper from './helpers/ofArrayCollectionHelper';

export default function ofArrayCollection<T>(collection: T[], creator: Creator<T> = of): ArrayCollection<T> {
  return of(ofArrayCollectionHelper(collection, creator));
}
