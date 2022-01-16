/**
 * @author Vighnesh Raut <rvighnes@amazon.com>
 */

import QueueNode from './queue_node';

/**
 * Implementation of the Queue Data Structure
 *
 * @template T type of the entries in the queue instance
 */
class Queue<T> {
  /**
   * Count of nodes in the queue
   *
   * @private
   */
  private nodesInQueue: number = 0;

  /**
   * Left point of the queue
   *
   * @private
   */
  private head: QueueNode<T> | null = null;

  /**
   * Right point of the queue
   *
   * @private
   */
  private tail: QueueNode<T> | null = null;

  /**
   * Size of the queue
   *
   * @type { number }
   */
  get size(): number {
    return this.nodesInQueue;
  }

  /**
   * Checks if the queue is empty
   *
   * @type {boolean} true, if queue has no elements, else, false
   */
  get isEmpty(): boolean {
    return this.nodesInQueue === 0;
  }

  /**
   * @param { ...T } [entries=[]] Initialize the queue with these entries
   */
  constructor(...entries: T[]) {
    this.pushRight(...entries);
  }

  /**
   * Peek at the left most entry of the queue
   *
   * @returns { T | null } returns the leftmost value from queue,
   * if queue has entries, else, null
   */
  peekLeft = (): T | null => {
    if (this.isEmpty) {
      return null;
    }

    return this.head!.value;
  };

  /**
   * Peek at the right most entry of the queue
   *
   * @returns { T | null } returns the rightmost value from queue,
   * if queue has entries, else, null
   */
  peekRight = (): T | null => {
    if (this.isEmpty) {
      return null;
    }

    return this.tail!.value;
  };

  /**
   * Add new values to the queue from the left
   *
   * @param { ...T } [entries=[]] new values to be added from
   * the left of the queue
   * @returns { void }
   */
  pushLeft = (...entries: T[]): void => {
    entries.forEach(this.pushLeftOne);
  };

  /**
   * Add new values to the queue from the right
   *
   * @param { ...T } [entries=[]] new values to be added from
   * the right of the queue
   * @returns { void }
   */
  pushRight = (...entries: T[]): void => {
    entries.forEach(this.pushRightOne);
  };

  /**
   * Pop an element from the leftmost side of the queue
   *
   * @returns { T | null } leftmost entry from the queue.
   * If queue is empty, returns null.
   */
  popLeft = (): T | null => {
    if (this.isEmpty) {
      return null;
    }

    this.nodesInQueue -= 1;
    const toBeRemovedNode = this.head!;

    if (this.size === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = toBeRemovedNode.rightPointsTo;
      this.head!.leftPointsTo = null;
    }

    return toBeRemovedNode.value;
  };

  /**
   * Pop an element from the rightmost side of the queue
   *
   * @returns { T | null } rightmost entry from the queue.
   * If queue is empty, returns null.
   */
  popRight = (): T | null => {
    if (this.isEmpty) {
      return null;
    }

    this.nodesInQueue -= 1;
    const toBeRemovedNode = this.tail!;

    if (this.size === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.tail = toBeRemovedNode.leftPointsTo;
      this.tail!.rightPointsTo = null;
    }

    return toBeRemovedNode.value;
  };

  /**
   * Creates a new Queue object with entries in reverse order
   *
   * @returns { Queue<T> } new Queue instance with entries in
   * reverse order
   */
  reverse = (): Queue<T> => {
    const reversedQueue = new Queue<T>();
    reversedQueue.pushRight(...this.toArray().reverse());
    return reversedQueue;
  };

  /**
   * Converts the queue to array. Order is from left to right.
   *
   * @returns { T[] } array of all the entries from the queue
   */
  toArray = (): T[] => {
    const result: T[] = [];

    let currentNode = this.head;
    while (currentNode !== null) {
      result.push(currentNode.value);
      currentNode = currentNode.rightPointsTo;
    }

    return result;
  };

  /**
   * Creates a new Queue object with the same entries in the current queue.
   *
   * @param {function(T): T} [cloneEntry=((entry) => entry)] Callback to clone the entry.
   * Useful if you want to deep-clone the queue. By default, returns the same entry.
   * @returns { Queue<T> } new Queue instance with all the entries from
   * current instance
   */
  clone = (cloneEntry: (entry: T) => T = (entry) => entry): Queue<T> => {
    const clonedQueue = new Queue<T>();
    clonedQueue.pushRight(...this.toArray().map(cloneEntry));
    return clonedQueue;
  };

  /**
   * Add one node to the left of the queue.
   *
   * @private
   * @param { T } entry value of the new node
   * @returns { void }
   */
  private pushLeftOne = (entry: T): void => {
    if (this.createFirstNode(entry)) {
      return;
    }

    this.nodesInQueue += 1;

    const newNode = new QueueNode(entry);
    const head = this.head!;
    newNode.rightPointsTo = head;
    head.leftPointsTo = newNode;
    this.head = newNode;
  };

  /**
   * Add one node to the right of the queue.
   *
   * @private
   * @param { T } entry value of the new node
   * @returns { void }
   */
  private pushRightOne = (entry: T): void => {
    if (this.createFirstNode(entry)) {
      return;
    }

    this.nodesInQueue += 1;

    const newNode = new QueueNode(entry);
    const tail = this.tail!;
    tail.rightPointsTo = newNode;
    newNode.leftPointsTo = tail;
    this.tail = newNode;
  };

  /**
   * Creates the first node in the queue. Returns true if the node
   * is created, else returns false.
   *
   * @private
   * @param { T } entry value of the first node
   * @returns { void }
   */
  private createFirstNode = (entry: T): boolean => {
    if (this.isEmpty) {
      this.nodesInQueue += 1;
      const newNode = new QueueNode(entry);
      this.head = newNode;
      this.tail = newNode;
      return true;
    }
    return false;
  };
}

export default Queue;
