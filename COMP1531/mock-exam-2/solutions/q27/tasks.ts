// SOLUTION - Mock Exam 2, Q27
// All types are defined in THIS file, because only tasks.ts is collected.

interface TaskDetails {
  description: string;
  priority: number;
}

interface Task extends TaskDetails {
  taskId: number;
  done: boolean;
}

interface TaskId {
  taskId: number;
}

interface ErrorObject {
  error: string;
}

type EmptyObject = Record<string, never>;

let tasks: Task[] = [];

/**
 * Find a task with the given description in the task list
 * @param {string} description - The description of the task
 * @returns {?} If the task exists, it returns the task object that includes
 * taskId(number), description(string), priority(number) and done(boolean).
 */
export function findTask(description: string): Task | undefined {
  return tasks.find(t => t.description === description);
}

/**
 * Add a new task to the task list.
 * @param {Task Object} task - The task is the task object
 * - Task object includes description(string) and priority(number) values.
 * @returns {taskId Object} - returns the taskId as the number in the object
 */
export function addTask(task: TaskDetails): TaskId | ErrorObject {
  if (findTask(task.description)) {
    return { error: 'Task already exists' };
  }

  const taskId = tasks.length + 1;
  const newTask = {
    taskId: taskId,
    description: task.description,
    priority: task.priority,
    done: false
  };
  tasks.push(newTask);
  return { taskId: taskId };
}

/**
 * Update the done status of a task
 * @param {number} taskId - the id of the task
 * @param {boolean} done - the done status to be updated
 * @returns {} - empty object
 */
export function setDone(taskId: number, done: boolean): EmptyObject | ErrorObject {
  const task = tasks.find(t => t.taskId === taskId);
  if (!task) {
    return { error: 'Invalid task Id' };
  }
  task.done = done;
  return {};
}

/**
 * clear the task list
 * @returns {}
 */
export function clear(): EmptyObject {
  tasks = [];
  return {};
}
