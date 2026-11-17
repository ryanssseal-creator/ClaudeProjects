import { describe, test, expect, beforeEach } from 'vitest';
import { findTask, addTask, setDone, clear } from './tasks.ts';

const task1 = { description: 'Write tests', priority: 1 };

beforeEach(() => {
  clear();
});

describe('findTask()', () => {
  test('success > returns the right task if it exists', () => {
    addTask(task1);
    expect(findTask('Write tests')).toStrictEqual({
      taskId: expect.any(Number),
      description: 'Write tests',
      priority: 1,
      done: false
    });
  });

  test('error > returns undefined for empty description', () => {
    expect(findTask('')).toBeUndefined();
  });

  test('error > returns undefined for unknown description', () => {
    addTask(task1);
    expect(findTask('Tidy desk')).toBeUndefined();
  });
});

describe('addTask()', () => {
  test('success > returns the taskId if success', () => {
    expect(addTask(task1)).toStrictEqual({ taskId: expect.any(Number) });
  });

  test('error > returns error for existing description', () => {
    addTask(task1);
    expect(addTask(task1)).toStrictEqual({ error: expect.any(String) });
  });
});

describe('setDone()', () => {
  let taskId1: { taskId: number };
  beforeEach(() => {
    taskId1 = addTask(task1) as { taskId: number };
  });

  test('success > returns empty object', () => {
    expect(setDone(taskId1.taskId, true)).toStrictEqual({});
  });

  test('error > returns error for invalid task id', () => {
    expect(setDone(taskId1.taskId + 1, true)).toStrictEqual({ error: expect.any(String) });
  });
});
