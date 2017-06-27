import {Observable} from 'rxjs/Observable';
import '../../src/add/observable/ofSetCollection';
import {checkCollectionElements} from './utils/ofCollectionTestHelpers';

describe('Static operator "ofSetCollection"', () => {
  it('should create array collection', (done) => {
    Observable.ofSetCollection(new Set([1, 2]))
      .subscribe((set) => {
        const [first, second] = [...set.values()];
        checkCollectionElements(first, second, done);
      });
  });
});
