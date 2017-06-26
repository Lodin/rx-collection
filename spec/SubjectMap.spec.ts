import {Subject} from 'rxjs/Subject';
import {SubjectMap} from '../src/SubjectMap';

describe('Class "SubjectMap"', () => {
  describe('during creation', () => {
    it('should create subjects by received array of keys', () => {
      const map = new SubjectMap(['key1', 'key2']);
      expect([...(map as any).subjects.keys()]).toEqual(['key1', 'key2']);
    });

    it('should create empty map if there is no keys', () => {
      const map = new SubjectMap();
      expect([...(map as any).subjects.keys()]).toEqual([]);
    });
  });

  describe('in common API', () => {
    let map: SubjectMap<string, string>;

    beforeEach(() => {
      map = new SubjectMap(['key1', 'key2']);
    });

    it('should get an iterator for all map keys', () => {
      expect([...map.keys()]).toEqual(['key1', 'key2']);
    });

    it('should get an iterator for all map values', () => {
      expect([...map.values()] as any).toEqual([jasmine.any(Subject), jasmine.any(Subject)]);
    });

    it('should get an iterator for all map entries', () => {
      expect([...map.entries()] as any).toEqual([['key1', jasmine.any(Subject)], ['key2', jasmine.any(Subject)]]);
    });

    it('should create new element if it is not already exist', () => {
      const subject = map.get('key3');
      expect([...map.keys()]).toEqual(['key1', 'key2', 'key3']);
      expect(subject).toEqual(jasmine.any(Subject));
    });

    it('should get element if it is already exist', () => {
      const subject1 = map.get('key3');
      const subject2 = map.get('key3');

      expect(subject1).toBe(subject2);
      expect([...map.keys()]).toEqual(['key1', 'key2', 'key3']);
    });

    it('should remove element by key', () => {
      map.remove('key2');
      expect([...map.keys()]).toEqual(['key1']);
    });

    it('should iterate over keys and values with "forEach" method', () => {
      let count = 0;

      map.forEach((subject, key) => {
        switch (count) {
          case 0:
            expect(key).toBe('key1');
            expect(subject).toEqual(jasmine.any(Subject));
            break;
          case 1:
            expect(key).toBe('key2');
            expect(subject).toEqual(jasmine.any(Subject));
            break;
          default:
            throw Error('Shouldn\'t be here');
        }

        count += 1;
      });

      expect(count).toBe(2);
    });

    it('should iterate over keys and values with "for" cycle', () => {
      let count = 0;

      for (const [key, subject] of map) {
        switch (count) {
          case 0:
            expect(key).toBe('key1');
            expect(subject).toEqual(jasmine.any(Subject));
            break;
          case 1:
            expect(key).toBe('key2');
            expect(subject).toEqual(jasmine.any(Subject));
            break;
          default:
            throw Error('Shouldn\'t be here');
        }

        count += 1;
      }

      expect(count).toBe(2);
    });
  });
});
