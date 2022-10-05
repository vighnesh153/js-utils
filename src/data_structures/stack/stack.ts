import { StackNode } from './stack_node';

/**
 * Implementation of the Stack data structure
 *
 * @typeParam T - type of the entries in the stack
 */
export class Stack<T> {
  /**
   * Stores the size of the stack
   */
  private countOfNodes: number = 0;

  /**
   * Points to the top of the stack
   */
  private head: StackNode<T> | null = null;

  /**
   * Size of the stack
   */
  get size(): number {
    return this.countOfNodes;
  }

  /**
   * Checks if the stack has any elements
   */
  get isEmpty(): boolean {
    return this.countOfNodes === 0;
  }

  /**
   * @param entries - Initialize the stack with these entries
   */
  constructor(...entries: T[]) {
    this.push(...entries);
  }

  /**
   * Peek at the top of the stack
   *
   * @throws Will throw error if stack is empty
   */
  peek(): T {
    if (this.isEmpty) {
      throw new Error('Stack is empty');
    }
    return this.head!.entry;
  }

  /**
   * Push entries to the top of the stack
   *
   * @param entries - entries to be added to the stack
   */
  push(...entries: T[]): void {
    entries.forEach((entry) => this.pushOne(entry));
  }

  /**
   * Pop out the topmost entry from the stack
   *
   * @throws Will throw error if stack is empty
   */
  pop(): T {
    if (this.isEmpty) {
      throw new Error('Stack is empty');
    }

    // Decrement the stack size
    this.countOfNodes -= 1;

    // Remove the node and set head to the next node
    const toRemoveNode = this.head!;
    this.head = toRemoveNode.pointsTo;

    // Return the node's value
    return toRemoveNode.entry;
  }

  /**
   * Reverse the stack
   */
  reverse(): Stack<T> {
    return new Stack<T>(...this.toArray().reverse());
  }

  /**
   * Converts the stack to array. Order is from bottom to top of stack.
   */
  toArray(): T[] {
    const result: T[] = [];

    let currentNode = this.head;
    while (currentNode !== null) {
      result.push(currentNode.entry);
      currentNode = currentNode.pointsTo;
    }

    // Should return in reverse as we want the order to be from bottom to top of the stack
    return result.reverse();
  }

  /**
   * Clones the stack instance.
   *
   * @param cloneEntry - Callback to clone the entry.
   * By default, returns the same entry
   */
  clone(cloneEntry: (entry: T) => T = (entry) => entry): Stack<T> {
    return this.map(cloneEntry);
  }

  /**
   * Map every element of the stack to a different form.
   *
   * @typeParam Q - return type of the map function
   * @param mapFn - Map the stack elements to a new form
   */
  map<Q>(mapFn: (entry: T) => Q = (e) => e as unknown as Q): Stack<Q> {
    const newStack = new Stack<Q>();
    newStack.push(...this.toArray().map(mapFn));
    return newStack;
  }

  /**
   * Filter out entries from the stack
   *
   * @param filterFn - A predicate, which will be applied to all the
   * entries. If returns true, the entry will be added to the new stack,
   * else, will be skipped
   */
  filter(filterFn: (entry: T) => boolean = () => true): Stack<T> {
    const filteredStack = new Stack<T>();
    filteredStack.push(...this.toArray().filter(filterFn));
    return filteredStack;
  }

  /**
   * Pushes one entry to the stack
   *
   * @param entry - new entry to be pushed to the top of the stack
   */
  private pushOne(entry: T): void {
    const newNode = new StackNode(entry);
    this.countOfNodes += 1;

    // stack is empty
    if (this.head === null) {
      this.head = newNode;
      return;
    }

    // stack has at least 1 entry
    newNode.pointsTo = this.head;
    this.head = newNode;
  }
}
