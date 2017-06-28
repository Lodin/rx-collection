import {Observable} from 'rxjs/Observable';
import '../../src/add/operator/forEachInArrayCollection';
import forEachInArrayCollection from '../../src/operator/forEachInArrayCollection';
import {ArrayContent} from '../../src/typings';
import {forEachInArrayCollectionTestHelper} from './utils/forEachInCollectionTestHelpers';

describe('Operator "forEachInArrayCollection"', () => {
  forEachInArrayCollectionTestHelper(forEachInArrayCollection)();

  it('should work when added to Observable prototype', (done) => {
    let counter = 0;

    Observable.of([Observable.of(100), Observable.of(200)])
      .forEachInArrayCollection((value, index, collection) => {
        if (counter === 0) {
          expect(value).toBe(100);
          expect(index).toBe(0);
          expect(collection).toEqual(jasmine.any(Array));
          done();
        }

        counter += 1;
      }).subscribe((collection: ArrayContent<number>) => collection);
  });
});
