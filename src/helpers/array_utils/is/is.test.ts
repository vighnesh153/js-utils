import { is } from './is';

describe('Helpers > Array Utils > Comparison tests', () => {
  test.each([
    [[1, 2, 3], [1, 2, 3], true],
    [[1, 2, 5], [1, 2, 4], false],
    [[1, 2, 5], [1, 2, 5, 9], false],
  ])('equalsTo(simple arrays): %j equals %j ? %j', (arr1, arr2, expected) => {
    expect(is(arr1).equalsTo(arr2)).toBe(expected);
  });

  test.each([
    [
      [{ name: 'Vighnesh' }, { name: 'Dehlia' }],
      [{ name: 'Vighnesh' }, { name: 'Dehlia' }],
      true,
      (el1: { name: string }, el2: { name: string }) => el1.name === el2.name,
    ],
    [
      [{ name: 'Vighnesh' }, { name: 'Dehlia' }],
      [{ name: 'Vighnesh' }, { name: 'Doll' }],
      false,
      (el1: { name: string }, el2: { name: string }) => el1.name === el2.name,
    ],
  ])(
    'equalsTo(complex arrays): %j equals %j ? %j',
    (arr1, arr2, expected, compare) => {
      expect(is(arr1).equalsTo(arr2, compare)).toBe(expected);
    }
  );

  test.each([
    [[1, 2, 3], [1, 2, 4], true],
    [[1, 2, 5], [1, 2, 4], false],
  ])('lessThan(simple arrays): %j lessThan %j ? %j', (arr1, arr2, expected) => {
    expect(is(arr1).lessThan(arr2)).toBe(expected);
  });

  test.each([
    [
      [{ age: 21 }, { age: 23 }],
      [{ age: 21 }, { age: 25 }],
      true,
      (el1: { age: number }, el2: { age: number }) => el1.age - el2.age,
    ],
    [
      [{ age: 21 }, { age: 23 }],
      [{ age: 21 }, { age: 22 }],
      false,
      (el1: { age: number }, el2: { age: number }) => el1.age - el2.age,
    ],
  ])(
    'lessThan(complex arrays): %j lessThan %j ? %j',
    (arr1, arr2, expected, compare) => {
      expect(is(arr1).lessThan(arr2, compare)).toBe(expected);
    }
  );

  test.each([
    [[1, 2, 3], [1, 2, 4], true],
    [[1, 2, 4], [1, 2, 4], true],
    [[1, 2, 5], [1, 2, 4], false],
  ])('lessThanOrEqualsTo: %j <= %j ? %j', (arr1, arr2, expected) => {
    expect(is(arr1).lessThanOrEqualsTo(arr2)).toBe(expected);
  });

  test.each([
    [[1, 2, 4], [1, 2, 3], true],
    [[1, 2, 3], [1, 2, 4], false],
  ])('greaterThan: %j > %j ? %j', (arr1, arr2, expected) => {
    expect(is(arr1).greaterThan(arr2)).toBe(expected);
  });

  test.each([
    [[1, 2, 4], [1, 2, 3], true],
    [[1, 2, 4], [1, 2, 4], true],
    [[1, 2, 3], [1, 2, 4], false],
  ])('greaterThanOrEqualsTo: %j >= %j ? %j', (arr1, arr2, expected) => {
    expect(is(arr1).greaterThanOrEqualsTo(arr2)).toBe(expected);
  });
});
