// src/utils/localStorage.ts
import type { TaskState } from '../types/task';

export const loadState = (): { tasks: TaskState } | undefined => {
  try {
    const serializedState = localStorage.getItem('taskState');
    return serializedState ? JSON.parse(serializedState) : undefined;
  } catch (err) {
    console.error('Load error:', err);
    return undefined;
  }
};

export const saveState = (state: { tasks: TaskState }): void => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('taskState', serializedState);
  } catch (err) {
    console.error('Save error:', err);
  }
};
