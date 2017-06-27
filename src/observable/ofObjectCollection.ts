import {of} from 'rxjs/observable/of';
import {Creator, ObjectCollection} from '../typings';
import ofObjectCollectionHelper from './helpers/ofObjectCollectionHelper';

export default function ofObjectCollection(collection: {[key: string]: any}, creator: Creator<any> = of): ObjectCollection<any> {
  return of(ofObjectCollectionHelper(collection, creator));
}
