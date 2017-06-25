import {Observable} from 'rxjs/Observable';
import filterArrayCollection from '../../operator/filterArrayCollection';

Observable.prototype.filterArrayCollection = filterArrayCollection;

declare module 'rxjs/Observable' {
  interface Observable<T> {
    filterArrayCollection: typeof filterArrayCollection;
  }
}
