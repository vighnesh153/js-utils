import { Heap } from 'src/data_structures/heap';
import { isInteger } from 'src/math/numbers/is_integer';
import { not } from 'src/helpers/not';

/**
 * Object based repr of a key and its count
 */
export interface CounterKeyCount {
  /**
   * String repr of the item
   */
  key: string;

  /**
   * Count of occurrences in the iterable
   */
  count: number;
}

/**
 * Key values pairs where key is the string repr of item
 * and the value is the count of its occurrences in the iterable.
 */
export interface CounterItems {
  [key: string]: number;
}

/**
 * Utility class to count the occurrences of items in an iterable
 */
export class Counter<T> {
  private readonly items: CounterItems = {};

  private readonly maxHeap: Heap<CounterKeyCount> = new Heap<CounterKeyCount>();

  private readonly minHeap: Heap<CounterKeyCount> = new Heap<CounterKeyCount>();

  constructor(iterable: Iterable<T>, keyGetter = (item: T) => `${item}`) {
    this.items = Counter.countIterable(iterable, keyGetter);
    const { maxHeap, minHeap } = Counter.heapify(this.items);
    this.maxHeap = maxHeap;
    this.minHeap = minHeap;
  }

  /**
   * The unique keys from the provided iterable
   */
  uniqueKeys = (): string[] => {
    return Object.keys(this.items);
  };

  /**
   * Get the count of occurrences of provided key in
   * the iterable
   *
   * @param key - Count occurrences of "key"
   */
  countFor = (key: any): number => {
    return this.items[key];
  };

  /**
   * Get the top "n" elements which have the most occurrence
   *
   * Note: if 2 elements have same occurrence, then the order
   * is not guaranteed
   *
   * @param count - how many elements
   */
  mostCommon = (count = 1): CounterKeyCount[] => {
    if (not(isInteger(count)) || count <= 0) {
      throw new Error(
        `Expected "count" to be a positive integer, found "${count}"`
      );
    }
    return this.maxHeap.peek(count);
  };

  /**
   * Get the top "n" elements which have the least occurrence
   *
   * Note: if 2 elements have same occurrence, then the order
   * is not guaranteed
   *
   * @param count - how many elements
   */
  leastCommon = (count = 1): CounterKeyCount[] => {
    if (not(isInteger(count)) || count <= 0) {
      throw new Error(
        `Expected "count" to be a positive integer, found "${count}"`
      );
    }
    return this.minHeap.peek(count);
  };

  /**
   * Returns the unique keys and their respective counts
   */
  getItems = (): CounterItems => {
    return { ...this.items };
  };

  private static countIterable = <Q>(
    iterable: Iterable<Q>,
    keyGetter: (item: Q) => string
  ): CounterItems => {
    const items: CounterItems = {};

    // Iterate over all the items and increment their count
    Array.from(iterable).forEach((item) => {
      const key = keyGetter(item);
      items[key] = (items[key] || 0) + 1;
    });

    return items;
  };

  private static heapify = (
    items: CounterItems
  ): { maxHeap: Heap<CounterKeyCount>; minHeap: Heap<CounterKeyCount> } => {
    const keyCounts: CounterKeyCount[] = Object.keys(items).map((key) => ({
      key,
      count: items[key],
    }));

    // Needed for getting mostCommon elements
    const maxHeap = new Heap<CounterKeyCount>(keyCounts, (el1, el2) => {
      const isEl1Parent = el1.count > el2.count;
      return {
        parent: isEl1Parent ? el1 : el2,
        child: isEl1Parent ? el2 : el1,
      };
    });

    // Needed for getting leastCommon elements
    const minHeap = new Heap<CounterKeyCount>(keyCounts, (el1, el2) => {
      const isEl1Parent = el1.count < el2.count;
      return {
        parent: isEl1Parent ? el1 : el2,
        child: isEl1Parent ? el2 : el1,
      };
    });

    return { maxHeap, minHeap };
  };
}
