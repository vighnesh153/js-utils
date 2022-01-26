import QueueNode from './queue_node';

/**
 * Implementation of the Queue Data Structure
 *
 * @typeParam T - type of the entries in the queue
 */
class Queue<T> {
  /**
   * Count of nodes in the queue
   */
  private nodesInQueue: number = 0;

  /**
   * Left point of the queue
   */
  private head: QueueNode<T> | null = null;

  /**
   * Right point of the queue
   */
  private tail: QueueNode<T> | null = null;

  /**
   * Size of the queue
   */
  get size(): number {
    return this.nodesInQueue;
  }

  /**
   * Checks if the queue is empty
   */
  get isEmpty(): boolean {
    return this.nodesInQueue === 0;
  }

  /**
   * @param entries - Initialize the queue with these entries
   */
  constructor(...entries: T[]) {
    this.pushRight(...entries);
  }

  /**
   * Peek at the left most entry of the queue
   *
   * @throws Will throw an error if queue is empty
   */
  peekLeft = (): T | null => {
    if (this.isEmpty) {
      throw new Error('Queue is empty');
    }

    return this.head!.value;
  };

  /**
   * Peek at the right most entry of the queue
   *
   * @throws Will throw an error if queue is empty
   */
  peekRight = (): T | null => {
    if (this.isEmpty) {
      throw new Error('Queue is empty');
    }

    return this.tail!.value;
  };

  /**
   * Add new values to the queue from the left
   *
   * @param entries - new values to be added from the left of the queue
   */
  pushLeft = (...entries: T[]): void => {
    entries.forEach(this.pushLeftOne);
  };

  /**
   * Add new values to the queue from the right
   *
   * @param entries - new values to be added from the right of the queue
   */
  pushRight = (...entries: T[]): void => {
    entries.forEach(this.pushRightOne);
  };

  /**
   * Pop an element from the leftmost side of the queue
   *
   * @throws Will throw an error if queue is empty
   */
  popLeft = (): T | null => {
    if (this.isEmpty) {
      throw new Error('Queue is empty');
    }

    const toBeRemovedNode = this.head!;

    if (this.size === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = toBeRemovedNode.rightPointsTo;
      this.head!.leftPointsTo = null;
    }

    this.nodesInQueue -= 1;
    return toBeRemovedNode.value;
  };

  /**
   * Pop an element from the rightmost side of the queue
   *
   * @throws Will throw an error if queue is empty
   */
  popRight = (): T | null => {
    if (this.isEmpty) {
      throw new Error('Queue is empty');
    }

    const toBeRemovedNode = this.tail!;

    if (this.size === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.tail = toBeRemovedNode.leftPointsTo;
      this.tail!.rightPointsTo = null;
    }

    this.nodesInQueue -= 1;
    return toBeRemovedNode.value;
  };

  /**
   * Creates a new Queue object with entries in reverse order
   */
  reverse = (): Queue<T> => {
    const reversedQueue = new Queue<T>();
    reversedQueue.pushRight(...this.toArray().reverse());
    return reversedQueue;
  };

  /**
   * Converts the queue to array. Order is from left to right.
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
   * @param cloneEntry - Callback to clone the entry. Useful if you want
   * to deep-clone the queue. By default, returns the same entry.
   */
  clone = (cloneEntry: (entry: T) => T = (entry) => entry): Queue<T> => {
    return this.map(cloneEntry);
  };

  /**
   * Map the entries in the queue to a new form
   *
   * @typeParam Q - type of the new form of the entry
   * @param mapFn - map the entries in the queue to a new form
   */
  map = <Q>(mapFn: (entry: T) => Q = (e) => e as unknown as Q): Queue<Q> => {
    const mappedQueue = new Queue<Q>();
    mappedQueue.pushRight(...this.toArray().map(mapFn));
    return mappedQueue;
  };

  /**
   * Filter out the entries from the queue based on a predicate
   *
   * @param filterFn - predicate that accepts an entry as argument.
   * If it returns true, the entry will be picked. Else, not.
   */
  filter = (filterFn: (entry: T) => boolean = () => true): Queue<T> => {
    const filteredQueue = new Queue<T>();
    filteredQueue.pushRight(...this.toArray().filter(filterFn));
    return filteredQueue;
  };

  /**
   * Add one node to the left of the queue.
   *
   * @param entry - value of the new node
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
   * @param entry - value of the new node
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
   * @param entry - value of the first node
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
