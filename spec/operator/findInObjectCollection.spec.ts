import {Observable} from 'rxjs/Observable';
import '../../src/add/operator/findInObjectCollection';
import findInObjectCollection from '../../src/operator/findInObjectCollection';
import {findInObjectCollectionTestHelper} from './utils/findInCollectionTestHelpers';

describe('Operator "findInObjectCollection"', () => {
  findInObjectCollectionTestHelper(findInObjectCollection)();

  it('should work when added to Observable prototype', (done) => {
    Observable.of({first: Observable.of(100), second: Observable.of(200)})
      .findInObjectCollection(value => value === 100)
      .subscribe((value) => {
        expect(value).toBe(100);
        done();
      });
  });
});
