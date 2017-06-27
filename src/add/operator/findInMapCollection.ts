import {Observable} from 'rxjs/Observable';
import findInMapCollection from '../../operator/findInMapCollection';

Observable.prototype.findInMapCollection = findInMapCollection;

declare module 'rxjs/Observable' {
  interface Observable<T> {
    findInMapCollection: typeof findInMapCollection;
  }
}
