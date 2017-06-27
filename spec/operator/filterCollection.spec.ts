import 'rxjs/add/observable/of';
import {Observable} from 'rxjs/Observable';
import '../../src/add/operator/filterCollection';
import filterCollection from '../../src/operator/filterCollection';
import {
  filterArrayCollectionTestHelper,
  filterMapCollectionTestHelper, filterObjectCollectionTestHelper,
  filterSetCollectionTestHelper,
} from './utils/filterCollectionTestHelpers';

describe('Operator "filterCollection"', () => {
  describe('with map collection', filterMapCollectionTestHelper(filterCollection));
  describe('with set collection', filterSetCollectionTestHelper(filterCollection));
  describe('with array collection', filterArrayCollectionTestHelper(filterCollection));
  describe('with object collection', filterObjectCollectionTestHelper(filterCollection));

  it('should work when added to Observable prototype', (done) => {
    Observable.of([Observable.of(100), Observable.of(200)])
      .filterCollection(value => value === 100)
      .subscribe((collection) => {
        expect(collection.length).toBe(1);
        done();
      });
  });

  it('should throw type error if the collection type is wrong', () => {
    expect(() => {
      filterCollection
        .call(Observable.of(1), (value: number) => value !== 100)
        .subscribe((value: number) => value);
    }).toThrow(new TypeError('Unrecognized type of collection. Type should be "Array", "Object", "Map" or "Set"'));
  });
});
