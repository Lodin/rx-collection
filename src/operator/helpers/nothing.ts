import {Observable} from 'rxjs/Observable';
import {empty} from 'rxjs/observable/empty';
import {of} from 'rxjs/observable/of';

export const nothing = Symbol('nothing');

export function checkForNothing<T>(value: T|symbol): Observable<T> {
  return value === nothing ? empty() : of(value as T);
}
