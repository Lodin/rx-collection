import 'rxjs/add/observable/combineLatest';
import {Observable} from 'rxjs/Observable';
import '../../src/add/observable/ofCollection';

function checkCollectionElements(first: Observable<number>, second: Observable<number>, done: () => void): void {
  expect(first).toEqual(jasmine.any(Observable));
  expect(second).toEqual(jasmine.any(Observable));

  Observable.combineLatest(first, second, (f, s) => ({f, s}))
    .subscribe(({f, s}) => {
      expect(f).toBe(1);
      expect(s).toBe(2);

      done();
    });
}

describe('Static operator "ofCollection"', () => {
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

  it('should create map collection', (done) => {
    const col = Observable.ofCollection(new Map<string, number>([['first', 1], ['second', 2]]));
    col.subscribe((map) => {
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

  it('should throw a type error if the collection type is wrong', () => {
    expect(() => Observable.ofCollection(1 as any))
      .toThrow(new TypeError('Unrecognized type of collection. Type should be "Array", "Object", "Map" or "Set"'));
  });
});
