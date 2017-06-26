// tslint:disable:ban-types

import 'rxjs/add/observable/of';
import {Observable} from 'rxjs/Observable';
import {
  ArrayCollection, ArrayContent,
  MapCollection, MapContent,
  ObjectCollection, ObjectContent,
  SetCollection, SetContent,
} from '../../../src/typings';

export function filterMapCollectionTestHelper(operator: Function): () => void {
  return () => {
    let source: MapCollection<string, number>;

    beforeEach(() => {
      source = Observable.of(new Map([['first', Observable.of(100)], ['second', Observable.of(200)]]));
    });

    it('should filter collection', (done) => {
      operator.call(source, (value: number) => value !== 100)
        .subscribe((collection: MapContent<string, number>) => {
          expect(collection.size).toBe(1);

          const second = collection.get('second') as Observable<number>;
          second.subscribe((value: number) => {
            expect(value).toBe(200);
            done();
          });
        });
    });

    it('should get key and collection along with value', (done) => {
      let counter = 0;
      operator.call(source, (value: number, index: string, collection: MapContent<string, number>) => {
        switch (counter) {
          case 0:
            expect(value).toEqual(100);
            expect(index).toBe('first');
            expect(collection).toEqual(jasmine.any(Map));
            break;
          case 1:
            expect(value).toEqual(200);
            expect(index).toBe('second');
            expect(collection).toEqual(jasmine.any(Map));
            done();
            break;
          default:
            break;
        }

        counter += 1;

        return value !== 100;
      })
        .subscribe((collection: MapContent<string, number>) => {
          expect(collection).toEqual(jasmine.any(Map));
        });
    });
  };
}

export function filterSetCollectionTestHelper(operator: Function): () => void {
  return () => {
    let source: SetCollection<number>;

    beforeEach(() => {
      source = Observable.of(new Set([Observable.of(100), Observable.of(200)]));
    });

    it('should filter collection', (done) => {
      operator.call(source, (value: number) => value !== 100)
        .subscribe((collection: SetContent<number>) => {
          expect(collection.size).toBe(1);

          const [second] = [...collection.values()];
          second.subscribe((value) => {
            expect(value).toBe(200);
            done();
          });
        });
    });

    it('should get index and collection along with value', (done) => {
      let counter = 0;
      operator.call(source, (value: number, index: number, collection: SetContent<number>) => {
        switch (counter) {
          case 0:
            expect(value).toEqual(100);
            expect(index).toBe(0);
            expect(collection).toEqual(jasmine.any(Set));
            break;
          case 1:
            expect(value).toEqual(200);
            expect(index).toBe(1);
            expect(collection).toEqual(jasmine.any(Set));
            done();
            break;
          default:
            break;
        }

        counter += 1;

        return value !== 100;
      })
        .subscribe((collection: SetContent<number>) => {
          expect(collection).toEqual(jasmine.any(Set));
        });
    });
  };
}

export function filterArrayCollectionTestHelper(operator: Function): () => void {
  return () => {
    let source: ArrayCollection<number>;

    beforeEach(() => {
      source = Observable.of([Observable.of(100), Observable.of(200)]);
    });

    it('should filter collection', (done) => {
      operator.call(source, (value: number) => value !== 100)
        .subscribe((collection: ArrayContent<number>) => {
          expect(collection.length).toBe(1);

          collection[0].subscribe((value: number) => {
            expect(value).toBe(200);
            done();
          });
        });
    });

    it('should get index and collection along with value', (done) => {
      let counter = 0;
      operator.call(source, (value: number, index: number, collection: ArrayContent<number>) => {
        switch (counter) {
          case 0:
            expect(value).toEqual(100);
            expect(index).toBe(0);
            expect(collection).toEqual(jasmine.any(Array));
            break;
          case 1:
            expect(value).toEqual(200);
            expect(index).toBe(1);
            expect(collection).toEqual(jasmine.any(Array));
            done();
            break;
          default:
            break;
        }

        counter += 1;

        return value !== 100;
      })
        .subscribe((collection: ArrayContent<number>) => {
          expect(collection).toEqual(jasmine.any(Array));
        });
    });
  };
}

export function filterObjectCollectionTestHelper(operator: Function): () => void {
  return () => {
    let source: ObjectCollection<number>;

    beforeEach(() => {
      source = Observable.of({first: Observable.of(100), second: Observable.of(200)});
    });

    it('should filter collection', (done) => {
      operator.call(source, (value: number) => value !== 100)
        .subscribe((collection: ObjectContent<any>) => {
          expect(Object.keys(collection).length).toBe(1);

          collection.second.subscribe((value: number) => {
            expect(value).toBe(200);
            done();
          });
        });
    });

    it('should get key and collection along with value', (done) => {
      let counter = 0;
      operator.call(source, (value: number, index: string, collection: ObjectContent<any>) => {
        switch (counter) {
          case 0:
            expect(value).toEqual(100);
            expect(index).toBe('first');
            expect(collection).toEqual(jasmine.any(Object));
            break;
          case 1:
            expect(value).toEqual(200);
            expect(index).toBe('second');
            expect(collection).toEqual(jasmine.any(Object));
            done();
            break;
          default:
            break;
        }

        counter += 1;

        return value !== 100;
      })
        .subscribe((collection: ObjectContent<any>) => {
          expect(collection).toEqual(jasmine.any(Object));
        });
    });
  };
}
