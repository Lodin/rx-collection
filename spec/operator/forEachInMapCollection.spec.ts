import {Observable} from 'rxjs/Observable';
import '../../src/add/operator/forEachInMapCollection';
import forEachInMapCollection from '../../src/operator/forEachInMapCollection';
import {MapContent} from '../../src/typings';
import {forEachInMapCollectionTestHelper} from './utils/forEachInCollectionTestHelpers';

describe('Operator "forEachInMapCollection"', () => {
  forEachInMapCollectionTestHelper(forEachInMapCollection)();

  it('should work when added to Observable prototype', (done) => {
    let counter = 0;

    Observable.of(new Map([['first', Observable.of(100)], ['second', Observable.of(200)]]))
      .forEachInMapCollection((value, key, collection) => {
        if (counter === 0) {
          expect(value).toBe(100);
          expect(key).toBe('first');
          expect(collection).toEqual(jasmine.any(Map));
          done();
        }

        counter += 1;
      }).subscribe((collection: MapContent<string, number>) => collection);
  });
});
