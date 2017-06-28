import {Observable} from 'rxjs/Observable';
import forEachInMapCollection from '../../operator/forEachInMapCollection';

Observable.prototype.forEachInMapCollection = forEachInMapCollection;

declare module 'rxjs/Observable' {
  interface Observable<T> {
    forEachInMapCollection: typeof forEachInMapCollection;
  }
}
