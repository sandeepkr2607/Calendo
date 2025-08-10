import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Task, TaskState } from '../types/task'; // ✅ centralized types

const initialState: TaskState = {
  tasks: [],
  filterCategory: '',
  searchQuery: '',
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const idx = state.tasks.findIndex((t) => t.id === action.payload.id);
      if (idx !== -1) {
        state.tasks[idx] = action.payload;
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((t) => t.id !== action.payload);
    },
    setFilterCategory: (state, action: PayloadAction<string>) => {
      state.filterCategory = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    moveTask: (
      state,
      action: PayloadAction<{
        id: string;
        newStartDate: string;
        newEndDate: string;
      }>
    ) => {
      const task = state.tasks.find((t) => t.id === action.payload.id);
      if (task) {
        task.startDate = action.payload.newStartDate;
        task.endDate = action.payload.newEndDate;
      }
    },
  },
});

export const {
  addTask,
  updateTask,
  deleteTask,
  setFilterCategory,
  setSearchQuery,
  moveTask,
} = taskSlice.actions;

export default taskSlice.reducer;
