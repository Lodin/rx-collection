import {Observable} from 'rxjs/Observable';
import staticOfObjectCollection from '../../observable/ofObjectCollection';

Observable.ofObjectCollection = staticOfObjectCollection;

declare module 'rxjs/Observable' {
  namespace Observable {
    export let ofObjectCollection: typeof staticOfObjectCollection;
  }
}
