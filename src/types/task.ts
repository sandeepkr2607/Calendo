// // src/types/task.ts
// export type Category = 'To Do' | 'In Progress' | 'Review' | 'Completed';

// export interface Task {
//   id: string;
//   // name: string; // 👈 added
//   title: string;
//   category: Category;
//   startDate: string; // yyyy-MM-dd
//   endDate: string;
// }

// export interface TaskState {
//   tasks: Task[];
//   filterCategory: string;
//   searchQuery: string;
// }

export type Category = 'To Do' | 'In Progress' | 'Review' | 'Completed';

export interface Task {
  id: string;
  title: string;
  category: Category;
  startDate: string; // yyyy-MM-dd
  endDate: string;
}

export interface TaskState {
  tasks: Task[];
  filterCategory: string;
  searchQuery: string;
}
