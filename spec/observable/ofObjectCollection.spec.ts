import {Observable} from 'rxjs/Observable';
import '../../src/add/observable/ofObjectCollection';
import {checkCollectionElements} from './utils/ofCollectionTestHelpers';

describe('Static operator "ofObjectCollection"', () => {
  it('should create array collection', (done) => {
    Observable.ofObjectCollection({first: 1, second: 2})
      .subscribe(({first, second}) => {
        checkCollectionElements(first, second, done);
      });
  });
});
