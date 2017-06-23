import 'rxjs/add/observable/of';
import {Observable} from 'rxjs/Observable';
import '../../src/add/operator/filterCollection';
import {ArrayCollection, MapCollection, ObjectCollection, SetCollection} from '../../src/typings';

describe('Operator "filterCollection"', () => {
  describe('with map collection', () => {
    let collection: MapCollection<string, number>;

    beforeEach(() => {
      collection = Observable.of(new Map([['first', Observable.of(100)], ['second', Observable.of(200)]]));
    });

    it('should filter', (done) => {
      collection.filterCollection(value => value !== 100)
        .subscribe((collection) => {
          expect(collection.size).toBe(1);

          const second = <Observable<number>>collection.get('second');
          second.subscribe((value) => {
            expect(value).toBe(200);
            done();
          });
        });
    });

    it('should get key and collection along with value', (done) => {
      let counter = 0;
      collection.filterCollection((value, index, collection) => {
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
        .subscribe((collection) => {
          expect(collection).toEqual(jasmine.any(Map));
        });
    });
  });

  describe('with set collection', () => {
    let collection: SetCollection<number>;

    beforeEach(() => {
      collection = Observable.of(new Set([Observable.of(100), Observable.of(200)]));
    });

    it('should filter', (done) => {
      collection.filterCollection(value => value !== 100)
        .subscribe((collection) => {
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
      collection.filterCollection((value, index, collection) => {
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
        .subscribe((collection) => {
          expect(collection).toEqual(jasmine.any(Set));
        });
    });
  });

  describe('with array collection', () => {
    let collection: ArrayCollection<number>;

    beforeEach(() => {
      collection = Observable.of([Observable.of(100), Observable.of(200)]);
    });

    it('should filter', (done) => {
      collection.filterCollection(value => value !== 100)
        .subscribe((collection) => {
          expect(collection.length).toBe(1);

          collection[0].subscribe((value) => {
            expect(value).toBe(200);
            done();
          });
        });
    });

    it('should get index and collection along with value', (done) => {
      let counter = 0;
      collection.filterCollection((value, index, collection) => {
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
        .subscribe((collection) => {
          expect(collection).toEqual(jasmine.any(Array));
        });
    });
  });

  describe('with object collection', () => {
    let collection: ObjectCollection<number>;

    beforeEach(() => {
      collection = Observable.of({first: Observable.of(100), second: Observable.of(200)});
    });

    it('should filter', (done) => {
      collection.filterCollection(value => value !== 100)
        .subscribe((collection) => {
          expect(Object.keys(collection).length).toBe(1);

          collection.second.subscribe((value) => {
            expect(value).toBe(200);
            done();
          });
        });
    });

    it('should get key and collection along with value', (done) => {
      let counter = 0;
      collection.filterCollection((value, index, collection) => {
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
        .subscribe((collection) => {
          expect(collection).toEqual(jasmine.any(Object));
        });
    });
  });

  it('should throw type error if the collection type is wrong', () => {
    expect(() => {
      Observable.of(<any>1)
        .filterCollection(value => value !== 100)
        .subscribe(value => value);
    }).toThrow(new TypeError('Unrecognized type of collection. Type should be "Array", "Object", "Map" or "Set"'));
  });
});
