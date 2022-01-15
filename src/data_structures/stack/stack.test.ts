/**
 * @author Vighnesh Raut <me@vighnesh153.com>
 */

import Stack from './stack';

describe('Data Structures > Stack tests', () => {
  describe('Stack initialization', () => {
    it('should allow to initialize the stack with no entries', () => {
      const stack = new Stack();
      expect(stack).toBeDefined();
    });

    it('should allow to initialize the stack with 1 entry', () => {
      const stack = new Stack(1);
      expect(stack).toBeDefined();
    });

    it('should allow to initialize the stack with multiple entries', () => {
      const stack = new Stack('a', 'b', 'c');
      expect(stack).toBeDefined();
    });
  });

  describe('Add entries to Stack', () => {
    describe('One entry at a time', () => {
      it('should allow to add entries to empty stack without any errors', () => {
        const stack = new Stack<number>();
        expect(() => {
          stack.push(2);
        }).not.toThrow();
      });

      it('should allow to add entries to non-empty stack without any errors', () => {
        const stack = new Stack<number>(1);
        expect(() => {
          stack.push(2);
          stack.push(3);
        }).not.toThrow();
      });
    });

    describe('Multiple entries at a time', () => {
      it('should allow to ', () => {
        const stack = new Stack<number>();
        expect(() => {
          stack.push(1, 2, 3);
        }).not.toThrow();
      });
    });
  });

  describe('Remove entries from Stack', () => {
    it('should return null if "pop" is invoked on empty stack', () => {
      const stack = new Stack();
      expect(stack.pop()).toBeNull();
    });

    it('should return the only entry in stack, if stack has just 1 element', () => {
      const stack = new Stack(1);
      expect(stack.pop()).toBe(1);
    });

    it('should return the top-most value from stack if stack has multiple elements', () => {
      const stack = new Stack(1, 2, 3);
      expect(stack.pop()).toBe(3);
    });

    it('should pop the stack elements in correct order', () => {
      const stack = new Stack(1, 2, 3);
      expect(stack.pop()).toBe(3);
      expect(stack.pop()).toBe(2);
      expect(stack.pop()).toBe(1);
      expect(stack.pop()).toBe(null);
    });
  });

  describe('Peek into the stack', () => {
    it('should return null if "peek" is invoked on an empty stack', () => {
      const stack = new Stack();
      expect(stack.peek()).toBeNull();
    });

    it('should return the top-most value from the stack', () => {
      const stack = new Stack(1, 2, 3);
      expect(stack.peek()).toBe(3);
    });
  });

  describe('Size of the stack', () => {
    it('should be 0 if stack is empty', () => {
      const stack = new Stack();
      expect(stack.size).toBe(0);
    });

    it('should be correct size after performing multiple operations', () => {
      const stack = new Stack(1, 2, 3);

      expect(stack.size).toBe(3);

      // add 1 entry to the stack
      stack.push(4);

      expect(stack.size).toBe(4);

      // remove 2 entries from stack
      stack.pop();
      stack.pop();

      expect(stack.size).toBe(2);

      // peek won't change the stack size
      stack.peek();
      stack.peek();
      stack.peek();

      expect(stack.size).toBe(2);

      // Invoking "pop", more number-of-times than
      // current stack size, size will always be 0
      stack.pop();
      stack.pop();
      stack.pop();
      stack.pop();
      stack.pop();

      expect(stack.size).toBe(0);
    });
  });

  describe('Convert stack to array', () => {
    it('should return an empty array if stack has no elements', () => {
      const stack = new Stack();
      expect(stack.toArray()).toStrictEqual([]);
    });

    it('should return an elements in same order they were inserted', () => {
      // Push one entry at a time
      const stack1 = new Stack('a', 'b', 'c');
      stack1.push('d');
      stack1.push('e');
      stack1.push('f');
      expect(stack1.toArray()).toStrictEqual(['a', 'b', 'c', 'd', 'e', 'f']);
    });
  });

  describe('Reverse the stack', () => {
    it('should reverse an empty stack to an empty stack', () => {
      const stack = new Stack();
      const reversedStack = stack.reverse();
      expect(reversedStack.size).toBe(0);
    });

    it('should reverse a non-empty stack', () => {
      const stack = new Stack(1, 2, 3);
      const reversedStack = stack.reverse();
      expect(stack.toArray()).toStrictEqual([1, 2, 3]);
      expect(reversedStack.toArray()).toStrictEqual([3, 2, 1]);
    });
  });

  describe('Clone the stack', () => {
    it('should not update original stack if cloned stack is updated', () => {
      const stack = new Stack<number>();
      const clonedStack = stack.clone();
      clonedStack.push(1);
      expect(stack.size).toBe(0);
      expect(clonedStack.size).toBe(1);
    });

    it('should use the default cloneEntry callback', () => {
      const stack = new Stack<{ n: number }>();
      stack.push({ n: 123 });
      const clonedStack = stack.clone();

      const entryOriginal = stack.peek();
      const entryCloned = clonedStack.peek();

      expect(entryOriginal).toBe(entryCloned);
    });

    it('should use the cloneEntry callback if provided', () => {
      const stack = new Stack<{ n: number }>();
      stack.push({ n: 123 });
      const clonedStack = stack.clone((e) => ({ ...e }));

      const entryOriginal = stack.peek();
      const entryCloned = clonedStack.peek();

      expect(entryOriginal).not.toBe(entryCloned);
    });
  });
});
