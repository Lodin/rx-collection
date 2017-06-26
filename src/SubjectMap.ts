import {Subject} from 'rxjs/Subject';

export class SubjectMap<T, U> {
  private subjects = new Map<T, Subject<U>>();

  public constructor(keys?: T[]) {
    if (keys === undefined) {
      return;
    }

    for (const key of keys) {
      this.subjects.set(key, new Subject<U>());
    }
  }

  public [Symbol.iterator](): IterableIterator<[T, Subject<U>]> { // tslint:disable-line:function-name
    return this.subjects[Symbol.iterator]();
  }

  public entries(): IterableIterator<[T, Subject<U>]> {
    return this.subjects.entries();
  }

  public forEach(callback: (value: Subject<U>, key: T, map: Map<T, Subject<U>>) => void): void {
    this.subjects.forEach(callback);
  }

  public get(key: T): Subject<U> {
    if (!this.subjects.has(key)) {
      const subject = new Subject<U>();
      this.subjects.set(key, subject);

      return subject;
    }

    return this.subjects.get(key) as Subject<U>;
  }

  public keys(): IterableIterator<T> {
    return this.subjects.keys();
  }

  public remove(key: T): boolean {
    return this.subjects.delete(key);
  }

  public values(): IterableIterator<Subject<U>> {
    return this.subjects.values();
  }
}
