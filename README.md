# rx-collection
RxCollection is a set of utils for [RxJS 5](https://github.com/ReactiveX/rxjs) designed to handle observable collections of Observables. 
**Observable collection of Observables** is an Observable that contains any type of collection (Array, Object, Map, etc.), all elements of 
which are Observables. E.g. you want to create ToDo list that contains ToDo elements any of which is changeable, and you want to observe 
the list and all of its elements changes. 

**Note**: It is an alpha release. API might change any time. Don't use in the production. 
 
## Installation
```bash
$ npm install --save rxjs rx-collection
```

## API
### `ofCollection(collection, creator)`
Initializes collection and converts all its elements to Observables. Receives two arguments:
* `collection` - the collection itself. It might be an instance of:
  * `Array`,
  * `Object`,
  * `Map`,
  * `Set`,
* `creator` - is a function that receives element of collection and returns Observable of it. The default value is `Observable.of`. If the
value is already Observable, it will be skipped.

Also you can use separate methods to reduce the result bundle size: 
* `ofArrayCollection(collection, creator)`,
* `ofObjectCollection(collection, creator)`,
* `ofMapCollection(collection, creator)`,
* `ofSetCollection(collection, creator)`.

```javascript
const collection = new Map([
  ['key1', 1],
  ['key2', 2]
]);

const creator = 
  val => 
    Observable.of(val)
      .do(val => console.log(val));

const observableCollection = Observable.ofCollection(collection, creator);

observableCollection.subscribe(val => {
  assert(val.get('key1') instanceof Observable);
  assert(val.get('key2') instanceof Observable);
  
  val.get('key1').subscribe(el => assert(el === 1));
  val.get('key2').subscribe(el => assert(el === 2));
})
```
### `filterCollection(callback)`
Filters collection by values of its elements. An analogue for `filter` element in `Array`. Receives one argument:
  * `callback(value, index, collection)` is a function that check element to satisfy the condition and returns boolean result. All 
  elements with `false` will be filtered. Function receives three arguments: `value`, `index` (it will be key for map or object) and 
  `collection`. 

```javascript
Observable.ofCollection([1, 2])
  .filterCollection(value => value !== 1)
  .subscribe(val => {
    assert(val.length === 1);
    val[0].subscribe(el => assert(el === 2));
  });
```
Separate methods: 
* `filterArrayCollection(callback)`,
* `filterObjectCollection(callback)`,
* `filterMapCollection(callback)`,
* `filterSetCollection(callback)`.

### `findInCollection(callback)`
Searches an element in collection by value. An analogue for `find` method of `Array`. Receives one argument:
  * `callback(value, index, collection)` is a function that checks elements to satisfy the condition and returns the boolean result.
  `findInCollection` will return the first element satisfied the condition. Function receives three arguments: `value`, `index` (it will 
  be key for map or object) and `collection`.
  
```javascript
Observable.ofCollection([1, 2])
  .findInCollection(val => val === 1)
  .subscribe(val => {
    assert(val instanceof Observable);
    val.subscribe(el => assert(el === 1));
  });
```
Separate methods: 
* `findInArrayCollection(callback)`,
* `findInObjectCollection(callback)`,
* `findInMapCollection(callback)`,
* `findInSetCollection(callback)`.

### `forEachInCollection(callback)`
Iterates collection by value. An analogue for `forEach` method of `Array`. Receives one argument: 
  * `callback(value, index, collection)` is a function that provides collection's observable value for user. This function can return 
  nothing and can change no value inside the Observables. Function receives three arguments: `value`, `index` (it will be key for map or
  object) and `collection`. 
  
```javascript
Observable.ofCollection([1, 2])
  .forEachInCollection(val => {
    console.log(val); // prints 1; then 2. 
  })
  .subscribe((val) => {
    console.log(val);
  });
```
Separate methods: 
* `forEachInArrayCollection(callback)`,
* `forEachInObjectCollection(callback)`,
* `forEachInMapCollection(callback)`,
* `forEachInSetCollection(callback)`.

### SubjectMap
An abstraction that allows to create same subject for every collection element, e.g. for merging this subject to collection element. 
It has following methods:

* `constructor([keys])`. Creates new instance of SubjectMap. Receives one argument:
  * `keys` (optional). Array, if it exists constructor will create subjects by these keys and put them to `SubjectMap`. 
* `get(key)`. Gets subject by `key` if it exists or creates new one. The `key` can have any type, like a `key` in `Map`. 
* `remove(key)`. Removes subject by `key`.
* `keys()`. Gets iterator all existing keys.
* `values()`. Gets iterator for all subjects.
* `entries()`. Gets iterator for pairs `[key, subject]`. 
* `forEach(callback)`. Iterates over the keys and values.
* `[Symbol.iterator]`. Make this map iterable with `for` cycle.

```javascript
const changeElement = new SubjectMap();

const creator = 
  state => 
    Observable.of(state)
      .merge(
        changeElement.get(state.id)
          .map(payload => state => `${state}.${payload}`)
      )
      .scan((acc, fn) => fn(acc));

const collection = Observable.ofCollection([{id: 1, data: 'a'}, {id: 2, data: 'b'}], creator)
  .subscribe(val => {
    val[0].skip(1).subscribe(el => assert(el === 'a.c'));
  });

changeElement.get(1).next('c');
```

## License
[MIT](./LICENSE)
