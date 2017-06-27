import {Observable} from 'rxjs/Observable';
import forEachInCollection from '../../operator/forEachInCollection';

Observable.prototype.forEachInCollection = forEachInCollection;

declare module 'rxjs/Observable' {
  interface Observable<T> {
    forEachInCollection: typeof forEachInCollection;
  }
}
