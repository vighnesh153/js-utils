import { deepFreeze } from '@utils';

describe('Helpers > deepFreeze tests', () => {
  it('should return the same object for a primitive', () => {
    const obj = 1;
    const deepFrozenObj = deepFreeze(obj);
    expect(deepFrozenObj).toBe(1);
  });

  it('should freeze a shallow object', () => {
    const obj = { a: 100 };
    const deepFrozenObj = deepFreeze(obj);

    expect(() => {
      (deepFrozenObj as any).a = 101;
    }).toThrowErrorMatchingInlineSnapshot(
      `"Cannot assign to read only property 'a' of object '#<Object>'"`
    );
  });

  it('should freeze a deep object', () => {
    const obj = { a: { a: { a: 100 } } };
    const deepFrozenObj = deepFreeze(obj);

    expect(() => {
      (deepFrozenObj.a.a as any).a = 101;
    }).toThrowErrorMatchingInlineSnapshot(
      `"Cannot assign to read only property 'a' of object '#<Object>'"`
    );
  });
});
