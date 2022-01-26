import { Heap } from './heap';

describe('Data Structures > Heap tests', () => {
  it('should return the correct size of the heap', () => {
    const heap = new Heap('1234567');
    expect(heap.size).toBe(7);
  });

  it('should return true for isEmpty if heap has no elements', () => {
    const heap = new Heap([]);
    expect(heap.isEmpty).toBe(true);
  });

  it('should return false for isEmpty if heap has some elements', () => {
    const heap = new Heap('1, 2, 3');
    expect(heap.isEmpty).toBe(false);
  });

  it('should throw if pop is invoked on an empty heap', () => {
    const heap = new Heap([]);
    expect(() => {
      heap.pop();
    }).toThrowErrorMatchingInlineSnapshot(`"Heap is empty"`);
  });

  it('should throw if count is not a positive integer', () => {
    const heap = new Heap('123');
    expect(() => {
      heap.pop(-1);
    }).toThrowErrorMatchingInlineSnapshot(
      `"Expected \\"count\\" to be a positive integer, found \\"-1\\""`
    );
  });

  it('should pop the smallest element from the heap', () => {
    const heap = new Heap([5, 3, 2, 6, 4]);
    const poppedElements = heap.pop();

    expect(poppedElements[0]).toBe(2);
  });

  it('should allow to convert the heap of numbers to a sorted array', () => {
    const array = [5, 6, 1, 9, 8, 8, 4, 2, 7, 0];
    const heap = new Heap(array);
    const sortedNumbers = heap.toSortedArray();

    expect(sortedNumbers).toStrictEqual(array.sort((a, b) => a - b));
  });

  it('should allow to convert the heap of string to a sorted array of characters', () => {
    const heap = new Heap('qwerty');
    const sortedCharacters = heap.toSortedArray();

    expect(sortedCharacters).toStrictEqual(['e', 'q', 'r', 't', 'w', 'y']);
  });

  it('should allow to push an element to the heap', () => {
    const heap = new Heap([4, 3, 5, 7, 1]);
    heap.push(6);

    expect(heap.toSortedArray()).toStrictEqual([1, 3, 4, 5, 6, 7]);
  });

  it('should use the custom comparatorFn', () => {
    const array = [4, 2, 6, 3, 9];

    // Max-heap simulation
    const heap = new Heap(array, (el1, el2) => ({
      parent: el1 <= el2 ? el2 : el1,
      child: el1 <= el2 ? el1 : el2,
    }));

    // It should be sorted in descending order
    expect(heap.toSortedArray()).toStrictEqual(array.sort((a, b) => b - a));
  });
});
