import {Observable} from 'rxjs/Observable';

export type Creator<T> = (value: T) => Observable<T>;
export type CommonForEachCallback<T, K, C, R> = (value: T, index: K, collection: C) => R;

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

export type MapCheckCallback<K, T> = CommonForEachCallback<T, K, MapContent<K, T>, boolean>;
export type SetCheckCallback<T> = CommonForEachCallback<T, number, SetContent<T>, boolean>;
export type ArrayCheckCallback<T> = CommonForEachCallback<T, number, ArrayContent<T>, boolean>;
export type ObjectCheckCallback<T> = CommonForEachCallback<T, string, ObjectContent<T>, boolean>;

export type MapForEachCallback<K, T> = CommonForEachCallback<T, K, MapContent<K, T>, void>;
export type SetForEachCallback<T> = CommonForEachCallback<T, number, SetContent<T>, void>;
export type ArrayForEachCallback<T> = CommonForEachCallback<T, number, ArrayContent<T>, void>;
export type ObjectForEachCallback<T> = CommonForEachCallback<T, string, ObjectContent<T>, void>;
