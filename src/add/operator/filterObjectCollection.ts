import {Observable} from 'rxjs/Observable';
import filterObjectCollection from '../../operator/filterObjectCollection';

Observable.prototype.filterObjectCollection = filterObjectCollection;

declare module 'rxjs/Observable' {
  interface Observable<T> {
    filterObjectCollection: typeof filterObjectCollection;
  }
}
