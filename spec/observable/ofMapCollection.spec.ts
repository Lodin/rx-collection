import {Observable} from 'rxjs/Observable';
import '../../src/add/observable/ofMapCollection';
import {checkCollectionElements} from './utils/ofCollectionTestHelpers';

describe('Static operator "ofMapCollection"', () => {
  it('should create array collection', (done) => {
    Observable.ofMapCollection(new Map([['first', 1], ['second', 2]]))
      .subscribe((map) => {
        const first = map.get('first') as Observable<number>;
        const second = map.get('second') as Observable<number>;

        checkCollectionElements(first, second, done);
      });
  });
});
