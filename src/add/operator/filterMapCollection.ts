import {Observable} from 'rxjs/Observable';
import filterMapCollection from '../../operator/filterMapCollection';

Observable.prototype.filterMapCollection = filterMapCollection;

declare module 'rxjs/Observable' {
  interface Observable<T> {
    filterMapCollection: typeof filterMapCollection;
  }
}
