import {Observable} from 'rxjs/Observable';

export type ArrayCollection<T> = Observable<Observable<T>[]>;
export type ObjectCollection<T> = Observable<{[key: string]: Observable<T>}>;
export type MapCollection<K, T> = Observable<Map<K, Observable<T>>>;
export type SetCollection<T> = Observable<Set<Observable<T>>>;
