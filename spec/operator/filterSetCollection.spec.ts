import {Observable} from 'rxjs/Observable';
import '../../src/add/operator/filterSetCollection';
import filterSetCollection from '../../src/operator/filterSetCollection';
import {filterSetCollectionTestHelper} from './utils/filterCollectionTestHelpers';

describe('Operator "filterSetCollection"', () => {
  filterSetCollectionTestHelper(filterSetCollection)();

  it('should work when added to Observable prototype', (done) => {
    Observable.of(new Set([Observable.of(100), Observable.of(200)]))
      .filterSetCollection(value => value === 100)
      .subscribe((collection) => {
        expect(collection.size).toBe(1);
        done();
      });
  });
});
