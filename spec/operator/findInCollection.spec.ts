import {Observable} from 'rxjs/Observable';
import '../../src/add/operator/findInCollection';
import findInCollection from '../../src/operator/findInCollection';
import {
  findInArrayCollectionTestHelper,
  findInMapCollectionTestHelper,
  findInObjectCollectionTestHelper,
  findInSetCollectionTestHelper,
} from './utils/findInCollectionTestHelpers';

describe('Operator "findInCollection"', () => {
  describe('with map collection', findInMapCollectionTestHelper(findInCollection));
  describe('with set collection', findInSetCollectionTestHelper(findInCollection));
  describe('with array collection', findInArrayCollectionTestHelper(findInCollection));
  describe('with object collection', findInObjectCollectionTestHelper(findInCollection));

  it('should work when added to Observable prototype', (done) => {
    Observable.of([Observable.of(100), Observable.of(200)])
      .findInCollection(value => value === 100)
      .subscribe((value) => {
        expect(value).toBe(100);
        done();
      });
  });

  it('should throw type error if the collection type is wrong', () => {
    expect(() => {
      findInCollection
        .call(Observable.of(1), (value: number) => value === 100)
        .subscribe((value: number) => value);
    }).toThrow(new TypeError('Unrecognized type of collection. Type should be "Array", "Object", "Map" or "Set"'));
  });
});
