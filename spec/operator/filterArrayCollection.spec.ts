import {Observable} from 'rxjs/Observable';
import '../../src/add/operator/filterArrayCollection';
import filterArrayCollection from '../../src/operator/filterArrayCollection';
import {filterArrayCollectionTestHelper} from './utils/filterCollectionTestHelpers';

describe('Operator "filterArrayCollection"', () => {
  filterArrayCollectionTestHelper(filterArrayCollection)();

  it('should work when added to Observable prototype', (done) => {
    Observable.of([Observable.of(100), Observable.of(200)])
      .filterArrayCollection(value => value === 100)
      .subscribe((collection) => {
        expect(collection.length).toBe(1);
        done();
      });
  });
});
