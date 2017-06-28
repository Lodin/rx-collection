import {Observable} from 'rxjs/Observable';
import forEachInArrayCollection from '../../operator/forEachInArrayCollection';

Observable.prototype.forEachInArrayCollection = forEachInArrayCollection;

declare module 'rxjs/Observable' {
  interface Observable<T> {
    forEachInArrayCollection: typeof forEachInArrayCollection;
  }
}
