import 'rxjs/add/observable/of';
import {Observable} from 'rxjs/Observable';
import '../../src/add/operator/forEachInCollection';
import forEachInCollection from '../../src/operator/forEachInCollection';
import {ArrayContent} from '../../src/typings';
import {
  forEachInArrayCollectionTestHelper,
  forEachInMapCollectionTestHelper,
  forEachInObjectCollectionTestHelper,
  forEachInSetCollectionTestHelper,
} from './utils/forEachInCollectionTestHelpers';

describe('Operator "forEachInCollection"', () => {
  describe('with map collection', forEachInMapCollectionTestHelper(forEachInCollection));
  describe('with set collection', forEachInSetCollectionTestHelper(forEachInCollection));
  describe('with array collection', forEachInArrayCollectionTestHelper(forEachInCollection));
  describe('with object collection', forEachInObjectCollectionTestHelper(forEachInCollection));

  it('should work when added to Observable prototype', (done) => {
    let counter = 0;
    Observable.of([Observable.of(100), Observable.of(200)])
      .forEachInCollection((value, index, collection) => {
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
