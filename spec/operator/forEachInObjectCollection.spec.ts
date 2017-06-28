import {Observable} from 'rxjs/Observable';
import '../../src/add/operator/forEachInObjectCollection';
import forEachInObjectCollection from '../../src/operator/forEachInObjectCollection';
import {ObjectContent} from '../../src/typings';
import {forEachInObjectCollectionTestHelper} from './utils/forEachInCollectionTestHelpers';

describe('Operator "forEachInObjectCollection"', () => {
  forEachInObjectCollectionTestHelper(forEachInObjectCollection)();

  it('should work when added to Observable prototype', (done) => {
    let counter = 0;

    Observable.of({first: Observable.of(100), second: Observable.of(200)})
      .forEachInObjectCollection((value, key, collection) => {
        if (counter === 0) {
          expect(value).toBe(100);
          expect(key).toBe('first');
          expect(collection).toEqual(jasmine.any(Object));
          done();
        }

        counter += 1;
      }).subscribe((collection: ObjectContent<number>) => collection);
  });
});
