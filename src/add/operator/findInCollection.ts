import {Observable} from 'rxjs/Observable';
import findInCollection from '../../operator/findInCollection';

Observable.prototype.findInCollection = findInCollection;

declare module 'rxjs/Observable' {
  interface Observable<T> {
    findInCollection: typeof findInCollection;
  }
}
