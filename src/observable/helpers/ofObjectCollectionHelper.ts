import {Creator, ObjectContent} from '../../typings';

export default function ofObjectCollectionHelper(collection: {[key: string]: any}, creator: Creator<any>): ObjectContent<any> {
  const result: ObjectContent<any> = {};

  for (const key of Object.keys(collection)) {
    result[key] = creator(collection[key]);
  }

  return result;
}
