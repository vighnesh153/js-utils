import { isInteger, not, times } from '@utils';

/**
 * Comparison result between 2 elements. Returned result's meaning: <br>
 * Negative: element-1 gets more priority <br>
 * Zero: element-1 and element-2 have same priority <br>
 * Positive: element-2 gets more priority <br>
 */
export type HeapComparator = number;

/**
 * Type of the comparator function. In the return-type,
 * the parent should hold the element which should be the parent
 * of the other element.
 *
 * @typeParam T - type of entry
 */
export type HeapComparatorFn<T> = (el1: T, el2: T) => HeapComparator;

const defaultComparatorFn = <T>(el1: T, el2: T): HeapComparator =>
  el1 <= el2 ? -1 : 1;

/**
 * Heap implementation
 *
 * @typeParam T - type of the elements in the heap instance
 */
export class Heap<T> {
  private readonly items: T[];

  private readonly comparatorFn: HeapComparatorFn<T>;

  /**
   * Returns the count of elements in the heap
   */
  get size(): number {
    return this.items.length;
  }

  /**
   * Returns true/false based on if there are elements in the heap
   */
  get isEmpty(): boolean {
    return this.size === 0;
  }

  constructor(
    initialIterable: Iterable<T> = [],
    comparatorFn: HeapComparatorFn<T> = defaultComparatorFn
  ) {
    this.items = Array.from(initialIterable);
    this.comparatorFn = comparatorFn;

    this.heapify();
  }

  /**
   * Add an entry to the heap
   *
   * @param entries - All the elements to be added to the heap
   */
  push = (...entries: T[]): void => {
    entries.forEach((entry) => {
      this.items.push(entry);
      this.siftUp(this.items.length - 1);
    });
  };

  /**
   * Pops "n" elements from the heap
   *
   * @throws Will throw an error if count is not a positive integer
   * @param count - Count of elements to be popped
   */
  pop = (count = 1): T[] => {
    if (count < 0 || not(isInteger(count))) {
      throw new Error(
        `Expected "count" to be a positive integer, found "${count}"`
      );
    }
    return times(count).do(this.popOne);
  };

  /**
   * Returns the top "n" elements.
   *
   * @throws Will throw an error if count is not a positive integer
   * @param count - Count of elements to be peeked
   */
  peek = (count = 1): T[] => {
    if (count < 0 || not(isInteger(count))) {
      throw new Error(
        `Expected "count" to be a positive integer, found "${count}"`
      );
    }
    const peekHowMany = count > this.size ? this.size : count;
    const peekElements = this.pop(peekHowMany);
    this.push(...peekElements);
    return [...peekElements];
  };

  /**
   * Converts the heap to a sorted array
   */
  toSortedArray = (): T[] => {
    const result: T[] = [];
    const heap = new Heap(this.items, this.comparatorFn);
    while (heap.size > 0) {
      result.push(heap.popOne());
    }
    return result;
  };

  /**
   * Runs the heapify algorithm on the items iterable
   */
  private heapify = (): void => {
    for (let i = this.items.length - 1; i >= 0; i -= 1) {
      this.siftDown(i);
    }
  };

  /**
   * Pops one element from the heap
   *
   * @throws Will throw if the heap is empty
   */
  private popOne = (): T => {
    if (this.size === 0) {
      throw new Error('Heap is empty');
    }
    if (this.size === 1) {
      return this.items.pop() as T;
    }

    // Element to be removed
    const topElement = this.items[0];

    // Last element will replace the first position
    this.items[0] = this.items.pop() as T;

    // siftDown to make it go in the correct place
    this.siftDown(0);

    return topElement;
  };

  /**
   * Sifts the element at "startPosition" till the top of the heap tree.
   *
   * @param startPosition - Sift up from this position
   */
  private siftUp = (startPosition: number): void => {
    const calculateNextIndices = (newCurrentIndex: number) => ({
      newCurrentIndex,
      newParentIndex: Math.ceil(newCurrentIndex / 2) - 1,
    });

    // Initial set of indices
    let nextIndices = calculateNextIndices(startPosition);
    let currentIndex = nextIndices.newCurrentIndex;
    let parentIndex = nextIndices.newParentIndex;

    while (currentIndex > 0) {
      // Grab the elements
      const currentEl = this.items[currentIndex];
      const parentEl = this.items[parentIndex];

      // Compare them and see which needs to go up and which needs to go down
      const compareResult = this.comparatorFn(currentEl, parentEl);

      // Update the items array based on the result above
      if (compareResult < 0) {
        // CurrentEl gets more priority
        this.items[parentIndex] = currentEl;
        this.items[currentIndex] = parentEl;
      } else {
        // ParentEl gets more priority
        this.items[parentIndex] = parentEl;
        this.items[currentIndex] = currentEl;
      }

      // Update the indices
      nextIndices = calculateNextIndices(parentIndex);
      currentIndex = nextIndices.newCurrentIndex;
      parentIndex = nextIndices.newParentIndex;
    }
  };

  /**
   * Sifts the element at "startPosition" till the bottom of the heap tree.
   *
   * @param startPosition - Sift down from this position
   */
  private siftDown = (startPosition: number): void => {
    const calculateNextIndices = (newCurrentIndex: number) => {
      const leftChildIndex = 2 * newCurrentIndex + 1;
      const rightChildIndex = leftChildIndex + 1;

      let newChildIndex = leftChildIndex;

      const leftChild = this.items[leftChildIndex];
      const rightChild = this.items[rightChildIndex];

      // If right child index is in bounds
      if (rightChildIndex < this.items.length) {
        const compareResult = this.comparatorFn(leftChild, rightChild);
        if (compareResult > 0) {
          // Right child has more priority
          newChildIndex = rightChildIndex;
        }
      }

      return {
        newCurrentIndex,
        newChildIndex,
      };
    };

    // Initial set of indices
    let nextIndices = calculateNextIndices(startPosition);
    let currentIndex = nextIndices.newCurrentIndex;
    let childIndex = nextIndices.newChildIndex;

    while (childIndex < this.items.length) {
      // Grab the elements
      const currentEl = this.items[currentIndex];
      const leftChildEl = this.items[childIndex];

      // Compare them and see which needs to go up and which needs to go down
      const compareResult = this.comparatorFn(currentEl, leftChildEl);

      // Update the items array based on the result above
      if (compareResult < 0) {
        // CurrentEl gets more priority
        this.items[currentIndex] = currentEl;
        this.items[childIndex] = leftChildEl;
      } else {
        // ParentEl gets more priority
        this.items[currentIndex] = leftChildEl;
        this.items[childIndex] = currentEl;
      }

      // Update the indices
      nextIndices = calculateNextIndices(childIndex);
      currentIndex = nextIndices.newCurrentIndex;
      childIndex = nextIndices.newChildIndex;
    }
  };
}
