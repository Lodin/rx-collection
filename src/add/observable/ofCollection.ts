import {Observable} from 'rxjs/Observable';
import staticOfCollection from '../../observable/ofCollection';

Observable.ofCollection = staticOfCollection;

declare module 'rxjs/Observable' {
  namespace Observable {
    export let ofCollection: typeof staticOfCollection;
  }
}
