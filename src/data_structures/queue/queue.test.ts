/**
 * @author Vighnesh Raut <me@vighnesh153.com>
 */

import Queue from './queue';

describe('Data Structures > Queue tests', () => {
  it('should allow to initialize', () => {
    const queue = new Queue(1, 2, 3);
    expect(queue).toBeDefined();
  });

  it('should allow to convert the queue to an array', () => {
    const queue = new Queue(1, 2, 3, 4, 5);

    expect(queue.toArray()).toStrictEqual([1, 2, 3, 4, 5]);
  });

  it('should return 0 for size if the queue has no entries', () => {
    const queue = new Queue();

    expect(queue.size).toBe(0);
  });

  it('should return correct size of the queue if queue has entries', () => {
    const queue = new Queue(1, 2, 3, 4, 5, 6);

    expect(queue.size).toBe(6);
  });

  it('should return true for isEmpty if queue has no entries', () => {
    const queue = new Queue();

    expect(queue.isEmpty).toBe(true);
  });

  it('should return false for isEmpty if queue has entries', () => {
    const queue = new Queue(1, 2, 3, 4);

    expect(queue.isEmpty).toBe(false);
  });

  it('should allow to push multiple entries to the queue from right', () => {
    const queue = new Queue(1);
    queue.pushRight(2, 3);

    expect(queue.toArray()).toStrictEqual([1, 2, 3]);
  });

  it('should allow to push multiple entries to the queue from left', () => {
    const queue = new Queue(1);
    queue.pushLeft(2, 3, 4);

    expect(queue.toArray()).toStrictEqual([4, 3, 2, 1]);
  });

  it('should allow to peek an element from the left', () => {
    const queue = new Queue(1, 2, 3);
    expect(queue.peekLeft()).toBe(1);
  });

  it('should not modify the queue elements if peeked from left', () => {
    const queue = new Queue(1, 2, 3);
    queue.peekLeft();
    expect(queue.toArray()).toStrictEqual([1, 2, 3]);
  });

  it('should allow to peek an element from the right', () => {
    const queue = new Queue(1, 2, 3);
    expect(queue.peekRight()).toBe(3);
  });

  it('should not modify the queue elements if peeked from right', () => {
    const queue = new Queue(1, 2, 3);
    queue.peekRight();
    expect(queue.toArray()).toStrictEqual([1, 2, 3]);
  });

  it('should return the popped element from the left', () => {
    const queue = new Queue(1, 2, 3);
    expect(queue.popLeft()).toBe(1);
  });

  it('should remove the popped element from the left', () => {
    const queue = new Queue(1, 2, 3);
    queue.popLeft();
    expect(queue.toArray()).toStrictEqual([2, 3]);
  });

  it('should return the popped element from the right', () => {
    const queue = new Queue(1, 2, 3);
    expect(queue.popRight()).toBe(3);
  });

  it('should remove the popped element from the right', () => {
    const queue = new Queue(1, 2, 3);
    queue.popRight();
    expect(queue.toArray()).toStrictEqual([1, 2]);
  });

  it('should allow to reverse a queue', () => {
    const queue = new Queue(1, 2, 3);
    const reversedQueue = queue.reverse();

    expect(reversedQueue.toArray()).toStrictEqual([3, 2, 1]);
  });

  it('should not modify the existing queue when reverse is invoked', () => {
    const queue = new Queue(1, 2, 3);
    queue.reverse();

    expect(queue.toArray()).toStrictEqual([1, 2, 3]);
  });

  it('should allow to clone the queue in a new instance', () => {
    const queue = new Queue(1, 2, 3);
    const clonedQueue = queue.clone();

    expect(clonedQueue.toArray()).toStrictEqual([1, 2, 3]);
  });

  it('should return a new instance of queue when cloning', () => {
    const queue = new Queue(1, 2, 3);
    const clonedQueue = queue.clone();

    expect(clonedQueue).not.toBe(queue);
  });

  it('should by default return the same entries while cloning', () => {
    const queue = new Queue({ a: 1 });
    const clonedQueue = queue.clone();

    expect(clonedQueue.peekLeft()).toBe(queue.peekLeft());
  });

  it('should use the cloneEntry callback, if provided, while cloning', () => {
    const queue = new Queue({ a: 1 });
    const clonedQueue = queue.clone((e) => ({ ...e }));

    expect(clonedQueue.peekLeft()).toStrictEqual(queue.peekLeft());
  });
});
