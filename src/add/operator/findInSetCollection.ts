import {Observable} from 'rxjs/Observable';
import findInSetCollection from '../../operator/findInSetCollection';

Observable.prototype.findInSetCollection = findInSetCollection;

declare module 'rxjs/Observable' {
  interface Observable<T> {
    findInSetCollection: typeof findInSetCollection;
  }
}
