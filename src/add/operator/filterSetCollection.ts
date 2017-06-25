import {Observable} from 'rxjs/Observable';
import filterSetCollection from '../../operator/filterSetCollection';

Observable.prototype.filterSetCollection = filterSetCollection;

declare module 'rxjs/Observable' {
  interface Observable<T> {
    filterSetCollection: typeof filterSetCollection;
  }
}
