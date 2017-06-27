import {Observable} from 'rxjs/Observable';
import '../../src/add/observable/ofArrayCollection';
import {checkCollectionElements} from './utils/ofCollectionTestHelpers';

describe('Static operator "ofArrayCollection"', () => {
  it('should create collection', (done) => {
    Observable.ofArrayCollection([1, 2])
      .subscribe(([first, second]) => {
        checkCollectionElements(first, second, done);
      });
  });
});
