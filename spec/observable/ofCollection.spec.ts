import {Observable} from 'rxjs/Observable';
import '../../src/add/observable/ofCollection';
import {checkCollectionElements} from './utils/ofCollectionTestHelpers';

describe('Static operator "ofCollection"', () => {
  it('should create map collection', (done) => {
    Observable.ofCollection(new Map([['first', 1], ['second', 2]]))
      .subscribe((map) => {
        const first = map.get('first') as Observable<number>;
        const second = map.get('second') as Observable<number>;

        checkCollectionElements(first, second, done);
      });
  });

  it('should create set collection', (done) => {
    Observable.ofCollection(new Set([1, 2]))
      .subscribe((set) => {
        const [first, second] = [...set.values()];
        checkCollectionElements(first, second, done);
      });
  });

  it('should create array collection', (done) => {
    Observable.ofCollection([1, 2])
      .subscribe(([first, second]) => {
        checkCollectionElements(first, second, done);
      });
  });

  it('should create object collection', (done) => {
    Observable.ofCollection({first: 1, second: 2})
      .subscribe(({first, second}) => {
        checkCollectionElements(first, second, done);
      });
  });

  it('should throw a type error if the collection type is wrong', () => {
    expect(() => Observable.ofCollection(1 as any))
      .toThrow(new TypeError('Unrecognized type of collection. Type should be "Array", "Object", "Map" or "Set"'));
  });
});
