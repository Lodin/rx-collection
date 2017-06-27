// tslint:disable:export-name

import 'rxjs/add/observable/combineLatest';
import {Observable} from 'rxjs/Observable';

export function checkCollectionElements(first: Observable<number>, second: Observable<number>, done: () => void): void {
  expect(first).toEqual(jasmine.any(Observable));
  expect(second).toEqual(jasmine.any(Observable));

  Observable.combineLatest(first, second, (f, s) => ({f, s}))
    .subscribe(({f, s}) => {
      expect(f).toBe(1);
      expect(s).toBe(2);

      done();
    });
}
