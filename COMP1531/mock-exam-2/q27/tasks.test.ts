import { describe, test, expect, beforeEach } from 'vitest';
import { addTask, completeTask, getTasksByPriority, countRemaining, clear } from './tasks.ts';

beforeEach(() => {
  clear();
});

describe('addTask()', () => {
  test('success > returns the taskId', () => {
    expect(addTask('Write tests', 'high')).toStrictEqual({ taskId: expect.any(Number) });
  });

  test('success > with a due date', () => {
    expect(addTask('Write tests', 'high', '2026-11-20')).toStrictEqual({ taskId: expect.any(Number) });
  });

  test('error > empty description', () => {
    expect(addTask('', 'low')).toStrictEqual({ error: expect.any(String) });
  });
});

describe('completeTask()', () => {
  let id1: { taskId: number };
  beforeEach(() => {
    id1 = addTask('Write tests', 'high') as { taskId: number };
  });

  test('success > returns empty object', () => {
    expect(completeTask(id1.taskId)).toStrictEqual({});
  });

  test('error > invalid task id', () => {
    expect(completeTask(id1.taskId + 1)).toStrictEqual({ error: expect.any(String) });
  });
});

describe('getTasksByPriority()', () => {
  test('returns only tasks with that priority', () => {
    const a = addTask('Write tests', 'high') as { taskId: number };
    addTask('Tidy desk', 'low');
    const c = addTask('Fix pipeline', 'high', '2026-11-20') as { taskId: number };
    expect(getTasksByPriority('high')).toStrictEqual({
      tasks: [
        { taskId: a.taskId, description: 'Write tests', priority: 'high', done: false },
        { taskId: c.taskId, description: 'Fix pipeline', priority: 'high', done: false, dueDate: '2026-11-20' },
      ]
    });
  });

  test('returns an empty list when there are none', () => {
    expect(getTasksByPriority('medium')).toStrictEqual({ tasks: [] });
  });
});

describe('countRemaining()', () => {
  test('counts tasks that are not done', () => {
    const a = addTask('Write tests', 'high') as { taskId: number };
    addTask('Tidy desk', 'low');
    expect(countRemaining()).toBe(2);
    completeTask(a.taskId);
    expect(countRemaining()).toBe(1);
  });
});
