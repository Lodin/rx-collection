import {Observable} from 'rxjs/Observable';
import '../../src/add/operator/filterObjectCollection';
import filterObjectCollection from '../../src/operator/filterObjectCollection';
import {filterObjectCollectionTestHelper} from './utils/filterCollectionTestHelpers';

describe('Operator "filterObjectCollection"', () => {
  filterObjectCollectionTestHelper(filterObjectCollection)();

  it('should work when added to Observable prototype', (done) => {
    Observable.of({first: Observable.of(100), second: Observable.of(200)})
      .filterObjectCollection(value => value === 100)
      .subscribe((collection) => {
        expect(Object.keys(collection).length).toBe(1);
        done();
      });
  });
});
