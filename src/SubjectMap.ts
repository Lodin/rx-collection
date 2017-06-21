import {Subject} from 'rxjs/Subject';

export class SubjectMap<T, U> {
  private _subjects = new Map<T, Subject<U>>();

  public constructor(keys?: T[]) {
    if (keys === undefined) {
      return;
    }

    for (const key of keys) {
      this._subjects.set(key, new Subject<U>());
    }
  }

  public [Symbol.iterator](): IterableIterator<[T, Subject<U>]> { // tslint:disable-line:function-name
    return this._subjects[Symbol.iterator]();
  }

  public entries(): IterableIterator<[T, Subject<U>]> {
    return this._subjects.entries();
  }

  public forEach(callback: (value: Subject<U>, key: T, map: Map<T, Subject<U>>) => void): void {
    this._subjects.forEach(callback);
  }

  public get(key: T): Subject<U> {
    if (!this._subjects.has(key)) {
      const subject = new Subject<U>();
      this._subjects.set(key, subject);

      return subject;
    }

    return <Subject<U>>this._subjects.get(key);
  }

  public keys(): IterableIterator<T> {
    return this._subjects.keys();
  }

  public remove(key: T): boolean {
    return this._subjects.delete(key);
  }

  public values(): IterableIterator<Subject<U>> {
    return this._subjects.values();
  }
}
