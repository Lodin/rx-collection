import * as isPlainObject from 'is-plain-object';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {ArrayCollection, Creator, MapCollection, ObjectCollection, SetCollection} from '../typings';
import ofArrayCollectionHelper from './helpers/ofArrayCollectionHelper';
import ofMapCollectionHelper from './helpers/ofMapCollectionHelper';
import ofObjectCollectionHelper from './helpers/ofObjectCollectionHelper';
import ofSetCollectionHelper from './helpers/ofSetCollectionHelper';

export default function ofCollection<K, T>(collection: Map<K, T>, creator?: Creator<T>): MapCollection<K, T>;
export default function ofCollection<T>(collection: Set<T>, creator?: Creator<T>): SetCollection<T>;
export default function ofCollection<T>(collection: T[], creator?: Creator<T>): ArrayCollection<T>;
export default function ofCollection(collection: {[key: string]: any}, creator?: Creator<any>): ObjectCollection<any>;

export default function ofCollection(collection: any, creator: Creator<any> = of): any {
  let result: any;

  if (Array.isArray(collection)) {
    result = ofArrayCollectionHelper(collection, creator);
  } else if (isPlainObject(collection)) {
    result = ofObjectCollectionHelper(collection, creator);
  } else if (collection instanceof Map) {
    result = ofMapCollectionHelper(collection, creator);
  } else if (collection instanceof Set) {
    result = ofSetCollectionHelper(collection, creator);
  } else {
    throw new TypeError('Unrecognized type of collection. Type should be "Array", "Object", "Map" or "Set"');
  }

  return of.call(Observable, result);
}
