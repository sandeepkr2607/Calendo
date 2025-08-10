import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './taskSlice';
import { loadState, saveState } from '../utils/localStorage';
import type { TaskState } from '../types/task';

const defaultTaskState: TaskState = {
  tasks: [],
  filterCategory: 'all',
  searchQuery: '',
};

const defaultState: { tasks: TaskState } = {
  tasks: defaultTaskState,
};

const preloadedState = loadState() ?? defaultState;

export const store = configureStore({
  reducer: {
    tasks: taskReducer,
  },
  preloadedState,
});

store.subscribe(() => {
  saveState({
    tasks: store.getState().tasks,
  });
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
