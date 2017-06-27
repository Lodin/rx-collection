import {Observable} from 'rxjs/Observable';
import staticOfArrayCollection from '../../observable/ofArrayCollection';

Observable.ofArrayCollection = staticOfArrayCollection;

declare module 'rxjs/Observable' {
  namespace Observable {
    export let ofArrayCollection: typeof staticOfArrayCollection;
  }
}
