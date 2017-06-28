import {Observable} from 'rxjs/Observable';
import forEachInObjectCollection from '../../operator/forEachInObjectCollection';

Observable.prototype.forEachInObjectCollection = forEachInObjectCollection;

declare module 'rxjs/Observable' {
  interface Observable<T> {
    forEachInObjectCollection: typeof forEachInObjectCollection;
  }
}
