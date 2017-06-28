// tslint:disable:ban-types

import 'rxjs/add/observable/of';
import {Observable} from 'rxjs/Observable';
import {
  ArrayCollection, ArrayContent,
  MapCollection, MapContent,
  ObjectCollection, ObjectContent,
  SetCollection, SetContent,
} from '../../../src/typings';

export function forEachInMapCollectionTestHelper(operator: Function): () => void {
  return () => {
    let source: MapCollection<string, number>;

    beforeEach(() => {
      source = Observable.of(new Map([['first', Observable.of(100)], ['second', Observable.of(200)]]));
    });

    it('should get value, key and collection inside the callback', (done) => {
      let counter = 0;

      operator.call(source, (value: number, key: string, collection: MapContent<string, number>) => {
        switch (counter) {
          case 0:
            expect(value).toBe(100);
            expect(key).toBe('first');
            expect(collection).toEqual(jasmine.any(Map));
            break;
          case 1:
            expect(value).toBe(200);
            expect(key).toBe('second');
            expect(collection).toEqual(jasmine.any(Map));
            done();
            break;
          default:
            break;
        }

        counter += 1;
      }).subscribe((collection: MapContent<string, number>) => collection);

      expect(counter).toBe(2);
    });
  };
}

export function forEachInSetCollectionTestHelper(operator: Function): () => void {
  return () => {
    let source: SetCollection<number>;

    beforeEach(() => {
      source = Observable.of(new Set([Observable.of(100), Observable.of(200)]));
    });

    it('should get value, index and collection inside the callback', (done) => {
      let counter = 0;

      operator.call(source, (value: number, index: number, collection: SetContent<number>) => {
        switch (counter) {
          case 0:
            expect(value).toBe(100);
            expect(index).toBe(0);
            expect(collection).toEqual(jasmine.any(Set));
            break;
          case 1:
            expect(value).toBe(200);
            expect(index).toBe(1);
            expect(collection).toEqual(jasmine.any(Set));
            done();
            break;
          default:
            break;
        }

        counter += 1;
      }).subscribe((collection: SetContent<number>) => collection);

      expect(counter).toBe(2);
    });
  };
}

export function forEachInArrayCollectionTestHelper(operator: Function): () => void {
  return () => {
    let source: ArrayCollection<number>;

    beforeEach(() => {
      source = Observable.of([Observable.of(100), Observable.of(200)]);
    });

    it('should get value, index and collection inside the callback', (done) => {
      let counter = 0;

      operator.call(source, (value: number, index: number, collection: ArrayContent<number>) => {
        switch (counter) {
          case 0:
            expect(value).toBe(100);
            expect(index).toBe(0);
            expect(collection).toEqual(jasmine.any(Array));
            break;
          case 1:
            expect(value).toBe(200);
            expect(index).toBe(1);
            expect(collection).toEqual(jasmine.any(Array));
            done();
            break;
          default:
            break;
        }

        counter += 1;
      }).subscribe((collection: ArrayContent<number>) => collection);

      expect(counter).toBe(2);
    });
  };
}

export function forEachInObjectCollectionTestHelper(operator: Function): () => void {
  return () => {
    let source: ObjectCollection<number>;

    beforeEach(() => {
      source = Observable.of({first: Observable.of(100), second: Observable.of(200)});
    });

    it('should get value, index and collection inside the callback', (done) => {
      let counter = 0;

      operator.call(source, (value: number, key: string, collection: ObjectContent<number>) => {
        switch (counter) {
          case 0:
            expect(value).toBe(100);
            expect(key).toBe('first');
            expect(collection).toEqual(jasmine.any(Object));
            break;
          case 1:
            expect(value).toBe(200);
            expect(key).toBe('second');
            expect(collection).toEqual(jasmine.any(Object));
            done();
            break;
          default:
            break;
        }

        counter += 1;
      }).subscribe((collection: ObjectContent<number>) => collection);

      expect(counter).toBe(2);
    });
  };
}
