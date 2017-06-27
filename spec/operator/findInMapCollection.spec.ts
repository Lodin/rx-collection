import {Observable} from 'rxjs/Observable';
import '../../src/add/operator/findInMapCollection';
import findInMapCollection from '../../src/operator/findInMapCollection';
import {findInMapCollectionTestHelper} from './utils/findInCollectionTestHelpers';

describe('Operator "findInMapCollection"', () => {
  findInMapCollectionTestHelper(findInMapCollection)();

  it('should work when added to Observable prototype', (done) => {
    Observable.of(new Map([['first', Observable.of(100)], ['second', Observable.of(200)]]))
      .findInMapCollection(value => value === 100)
      .subscribe((value) => {
        expect(value).toBe(100);
        done();
      });
  });
});
