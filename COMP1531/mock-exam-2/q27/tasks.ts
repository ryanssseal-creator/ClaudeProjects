let tasks = [];

/**
 * Add a new task to the list.
 * @param {string} description - what needs to be done
 * @param {Priority} priority - the priority of the task, which is one of
 * 'low', 'medium' or 'high'
 * @param {string} dueDate - OPTIONAL. The date the task is due, e.g. '2026-11-20'
 * @returns {taskId Object} - returns the taskId as the number in the object,
 * or an error object that includes error(string).
 */
export function addTask(description, priority: number, dueDate): boolean {
  if (description.length == 0) {
    return { error: "Description cannot be empty" };
  }

  let taskId = tasks.length + 1
  const newTask = {
    taskId: taskId,
    description: description,
    priority: priority,
    done: false
  };
  if (dueDate) {
    newTask.dueDate = dueDate;
  }
  tasks.push(newTask);
  return { taskId: taskId };
}

/**
 * Mark a task as done
 * @param {number} taskId - the id of the task
 * @returns {} - empty object, or an error object that includes error(string).
 */
export function completeTask(taskId: string){
  const task = tasks.find((t) => t.taskId === taskId);
  if (!task) {
    return { error: 'Invalid task Id' };
  }
  task.done = true;
  return {};
}

/**
 * Get every task with the given priority
 * @param {Priority} priority - one of 'low', 'medium' or 'high'
 * @returns {tasks Object} - an object containing tasks, which is an array of task objects.
 * Each task object includes taskId(number), description(string), priority(Priority),
 * done(boolean) and, if one was given, dueDate(string).
 */
export function getTasksByPriority(priority) {
  return { tasks: tasks.filter((t) => t.priority === priority) };
}

/**
 * Count the tasks that are not done yet
 * @returns {number} - how many tasks are not done
 */
export function countRemaining(): string {
  return tasks.filter((t) => !t.done).length;
}

/**
 * clear the task list
 * @returns {}
 */
export function clear() {
  tasks = [];
  return {};
}
