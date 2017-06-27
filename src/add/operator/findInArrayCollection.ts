import {Observable} from 'rxjs/Observable';
import findInArrayCollection from '../../operator/findInArrayCollection';

Observable.prototype.findInArrayCollection = findInArrayCollection;

declare module 'rxjs/Observable' {
  interface Observable<T> {
    findInArrayCollection: typeof findInArrayCollection;
  }
}
