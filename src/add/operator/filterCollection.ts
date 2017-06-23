import {Observable} from 'rxjs/Observable';
import filterCollection from '../../operator/filterCollection';

Observable.prototype.filterCollection = filterCollection;

declare module 'rxjs/Observable' {
  interface Observable<T> {
    filterCollection: typeof filterCollection;
  }
}
