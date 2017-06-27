import {Observable} from 'rxjs/Observable';
import staticOfSetCollection from '../../observable/ofSetCollection';

Observable.ofSetCollection = staticOfSetCollection;

declare module 'rxjs/Observable' {
  namespace Observable {
    export let ofSetCollection: typeof staticOfSetCollection;
  }
}
