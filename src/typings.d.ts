import {Observable} from 'rxjs/Observable';

export type Creator<T> = (value: T) => Observable<T>;
export type CommonForEachCallback<T, K, C> = (value: T, index: K, collection: C) => boolean;

export type MapContent<K, T> = Map<K, Observable<T>>;
export type SetContent<T> = Set<Observable<T>>;
export type ArrayContent<T> = Array<Observable<T>>;
export interface ObjectContent<T> {
  [key: string]: Observable<T>;
}

export type MapCollection<K, T> = Observable<MapContent<K, T>>;
export type SetCollection<T> = Observable<SetContent<T>>;
export type ArrayCollection<T> = Observable<ArrayContent<T>>;
export type ObjectCollection<T> = Observable<ObjectContent<T>>;

export type MapForEachCallback<K, T> = CommonForEachCallback<T, K, MapContent<K, T>>;
export type SetForEachCallback<T> = CommonForEachCallback<T, number, SetContent<T>>;
export type ArrayForEachCallback<T> = CommonForEachCallback<T, number, ArrayContent<T>>;
export type ObjectForEachCallback<T> = CommonForEachCallback<T, string, ObjectContent<T>>;
