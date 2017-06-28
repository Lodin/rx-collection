import {Observable} from 'rxjs/Observable';
import '../../src/add/operator/forEachInSetCollection';
import forEachInSetCollection from '../../src/operator/forEachInSetCollection';
import {SetContent} from '../../src/typings';
import {forEachInSetCollectionTestHelper} from './utils/forEachInCollectionTestHelpers';

describe('Operator "forEachInSetCollection"', () => {
  forEachInSetCollectionTestHelper(forEachInSetCollection)();

  it('should work when added to Observable prototype', (done) => {
    let counter = 0;

    Observable.of(new Set([Observable.of(100), Observable.of(200)]))
      .forEachInSetCollection((value, index, collection) => {
        if (counter === 0) {
          expect(value).toBe(100);
          expect(index).toBe(0);
          expect(collection).toEqual(jasmine.any(Set));
          done();
        }

        counter += 1;
      }).subscribe((collection: SetContent<number>) => collection);
  });
});
