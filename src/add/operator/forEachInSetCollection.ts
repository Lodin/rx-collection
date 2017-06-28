import {Observable} from 'rxjs/Observable';
import forEachInSetCollection from '../../operator/forEachInSetCollection';

Observable.prototype.forEachInSetCollection = forEachInSetCollection;

declare module 'rxjs/Observable' {
  interface Observable<T> {
    forEachInSetCollection: typeof forEachInSetCollection;
  }
}
