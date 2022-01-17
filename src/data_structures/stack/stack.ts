/**
 * @author Vighnesh Raut <me@vighnesh153.com>
 */

import StackNode from './stack_node';

/**
 * Implementation of the Stack data structure
 *
 * @template T type of the entries in the stack
 */
class Stack<T> {
  /**
   * Stores the size of the stack
   *
   * @private
   */
  private countOfNodes: number = 0;

  /**
   * Points to the top of the stack
   *
   * @private
   */
  private head: StackNode<T> | null = null;

  /**
   * Size of the stack
   *
   * @type { number } total count of nodes in the stack
   */
  get size(): number {
    return this.countOfNodes;
  }

  /**
   * Checks if the stack has any elements.
   *
   * @type { boolean } true, if stack has no entries, else, false
   */
  get isEmpty(): boolean {
    return this.countOfNodes === 0;
  }

  /**
   * @param { T[] } [entries=[]] Initialize the stack with these entries
   */
  constructor(...entries: T[]) {
    this.push(...entries);
  }

  /**
   * Peek at the top of the stack
   *
   * @returns { T | null } the top-entry element from the stack.
   * If stack is empty, returns null
   */
  peek = (): T | null => {
    // stack is empty
    if (this.isEmpty) {
      return null;
    }
    return this.head!.entry;
  };

  /**
   * Push entries to the top of the stack
   *
   * @param {T[]} [entries=[]] entries to be added to the stack
   * @returns { void }
   */
  push = (...entries: T[]): void => {
    entries.forEach(this.pushOne);
  };

  /**
   * Pop out the topmost entry from the stack
   *
   * @returns { T | null } top element from the stack.
   * If stack is empty, returns null
   */
  pop = (): T | null => {
    if (this.isEmpty) {
      return null;
    }

    // Decrement the stack size
    this.countOfNodes -= 1;

    // Remove the node and set head to the next node
    const toRemoveNode = this.head!;
    this.head = toRemoveNode.pointsTo;

    // Return the node's value
    return toRemoveNode.entry;
  };

  /**
   * Reverse the stack
   *
   * @returns { Stack<T> } new stack with entries in reverse order
   */
  reverse = (): Stack<T> => {
    return new Stack<T>(...this.toArray().reverse());
  };

  /**
   * Converts the stack to array. Order is from bottom to top of stack.
   *
   * @returns { T[] } array of all the entries from stack
   */
  toArray = (): T[] => {
    const result: T[] = [];

    let currentNode = this.head;
    while (currentNode !== null) {
      result.push(currentNode.entry);
      currentNode = currentNode.pointsTo;
    }

    // Should return in reverse as we want the order to be from bottom to top of the stack
    return result.reverse();
  };

  /**
   * Clones the stack instance
   *
   * @param { function(function(T): T): Stack<T> } [cloneEntry] Callback to clone the entry.
   * By default, returns the same entry
   * @returns { Stack<T> } new stack instance with same set of entries
   */
  clone = (cloneEntry: (entry: T) => T = (entry) => entry): Stack<T> => {
    return this.map(cloneEntry);
  };

  /**
   * Map every element of the stack to a different form.
   *
   * @template Q return type of the map function
   * @param { function(T): Q } mapFn
   * Map the stack elements to a new form
   * @returns { Stack<T> } new stack with entries in the new form
   */
  map = <Q>(mapFn: (entry: T) => Q = (e) => e as unknown as Q): Stack<Q> => {
    const newStack = new Stack<Q>();
    newStack.push(...this.toArray().map(mapFn));
    return newStack;
  };

  /**
   * Filter out entries from the stack
   *
   * @param { function(function(T): boolean): Stack<T> } filterFn A predicate, which will
   * be applied to all the entries. If returns true, the entry will be added to the new stack,
   * else, will be skipped
   * @returns { Stack<T> } new stack with entries that passed the predicate
   */
  filter = (filterFn: (entry: T) => boolean = () => true): Stack<T> => {
    const filteredStack = new Stack<T>();
    filteredStack.push(...this.toArray().filter(filterFn));
    return filteredStack;
  };

  /**
   * Pushes one entry to the stack
   *
   * @private
   * @param { T } entry new entry to be pushed to the top of the stack
   * @returns { void }
   */
  private pushOne = (entry: T): void => {
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
  };
}

export default Stack;
