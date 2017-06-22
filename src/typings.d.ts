import {Observable} from 'rxjs/Observable';

export type MapContent<K, T> = Map<K, Observable<T>>;
export type SetContent<T> = Set<Observable<T>>;
export type ArrayContent<T> = Observable<T>[];
export type ObjectContent<T> = {[key: string]: Observable<T>};

export type MapCollection<K, T> = Observable<MapContent<K, T>>;
export type SetCollection<T> = Observable<SetContent<T>>;
export type ArrayCollection<T> = Observable<ArrayContent<T>>;
export type ObjectCollection<T> = Observable<ObjectContent<T>>;
