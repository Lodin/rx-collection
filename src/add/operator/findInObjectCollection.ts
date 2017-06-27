import {Observable} from 'rxjs/Observable';
import findInObjectCollection from '../../operator/findInObjectCollection';

Observable.prototype.findInObjectCollection = findInObjectCollection;

declare module 'rxjs/Observable' {
  interface Observable<T> {
    findInObjectCollection: typeof findInObjectCollection;
  }
}
