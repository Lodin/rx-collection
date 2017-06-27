import {Observable} from 'rxjs/Observable';
import staticOfMapCollection from '../../observable/ofMapCollection';

Observable.ofMapCollection = staticOfMapCollection;

declare module 'rxjs/Observable' {
  namespace Observable {
    export let ofMapCollection: typeof staticOfMapCollection;
  }
}
