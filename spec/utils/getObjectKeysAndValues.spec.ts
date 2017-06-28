import getObjectKeysAndValues from '../../src/utils/getObjectKeysAndValues';

describe('Function "getObjectKeysAndValues"', () => {
  it('should get object keys and values', () => {
    const obj = {first: 1, second: 2};
    expect(getObjectKeysAndValues(obj)).toEqual([['first', 'second'], [1, 2]]);
  });

  it('should not get non-enumerable properties', () => {
    const obj = {first: 1, second: 2};

    Object.defineProperty(obj, 'enum', {
      enumerable: false,
      value: 5,
    });

    expect(getObjectKeysAndValues(obj)).toEqual([['first', 'second'], [1, 2]]);
  });

  it('should not get properties of extended object', () => {
    const obj = Object.create({parent: 6});

    obj.first = 1;
    obj.second = 2;

    expect(getObjectKeysAndValues(obj)).toEqual([['first', 'second'], [1, 2]]);
  });
});
