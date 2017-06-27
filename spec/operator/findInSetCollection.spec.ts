import {Observable} from 'rxjs/Observable';
import '../../src/add/operator/findInSetCollection';
import findInSetCollection from '../../src/operator/findInSetCollection';
import {findInSetCollectionTestHelper} from './utils/findInCollectionTestHelpers';

describe('Operator "findInSetCollection"', () => {
  findInSetCollectionTestHelper(findInSetCollection)();

  it('should work when added to Observable prototype', (done) => {
    Observable.of(new Set([Observable.of(100), Observable.of(200)]))
      .findInSetCollection(value => value === 100)
      .subscribe((value) => {
        expect(value).toBe(100);
        done();
      });
  });
});
