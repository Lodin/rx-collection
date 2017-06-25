import {Observable} from 'rxjs/Observable';
import '../../src/add/operator/filterMapCollection';
import filterMapCollection from '../../src/operator/filterMapCollection';
import {filterMapCollectionTestHelper} from './utils/filterCollectionTestHelpers';

describe('Operator "filterMapCollection"', () => {
  filterMapCollectionTestHelper(filterMapCollection)();

  it('should work when added to Observable prototype', (done) => {
    Observable.of(new Map([['first', Observable.of(100)], ['second', Observable.of(200)]]))
      .filterMapCollection(value => value === 100)
      .subscribe((collection) => {
        expect(collection.size).toBe(1);
        done();
      });
  });
});
