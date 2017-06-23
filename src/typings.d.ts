import {Observable} from 'rxjs/Observable';

export type CheckCallback<T, K, C> = (value: T, index: K, collection: C) => boolean;

export type MapContent<K, T> = Map<K, Observable<T>>;
export type SetContent<T> = Set<Observable<T>>;
export type ArrayContent<T> = Observable<T>[];
export type ObjectContent<T> = {[key: string]: Observable<T>};

export type MapCollection<K, T> = Observable<MapContent<K, T>>;
export type SetCollection<T> = Observable<SetContent<T>>;
export type ArrayCollection<T> = Observable<ArrayContent<T>>;
export type ObjectCollection<T> = Observable<ObjectContent<T>>;

export type MapCheckCallback<K, T> = CheckCallback<T, K, MapContent<K, T>>;
export type SetCheckCallback<T> = CheckCallback<T, number, SetContent<T>>;
export type ArrayCheckCallback<T> = CheckCallback<T, number, ArrayContent<T>>;
export type ObjectCheckCallback<T> = CheckCallback<T, string, ObjectContent<T>>;
