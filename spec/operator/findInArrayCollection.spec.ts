import {Observable} from 'rxjs/Observable';
import '../../src/add/operator/findInArrayCollection';
import findInArrayCollection from '../../src/operator/findInArrayCollection';
import {findInArrayCollectionTestHelper} from './utils/findInCollectionTestHelpers';

describe('Operator "findInArrayCollection"', () => {
  findInArrayCollectionTestHelper(findInArrayCollection)();

  it('should work when added to Observable prototype', (done) => {
    Observable.of([Observable.of(100), Observable.of(200)])
      .findInArrayCollection(value => value === 100)
      .subscribe((value) => {
        expect(value).toBe(100);
        done();
      });
  });
});
