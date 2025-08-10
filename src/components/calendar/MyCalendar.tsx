// import React, { useEffect, useState } from 'react';
// import TaskModal from '../modal/TaskModal';
// import ReadTaskModal from '../modal/ReadTaskModal';
// import EditTaskModal from '../modal/EditTaskModal';
// import { useAppSelector, useAppDispatch } from '../../store/hooks';
// import {
//   format,
//   addDays,
//   startOfMonth,
//   startOfWeek,
//   parseISO,
//   isWithinInterval,
// } from 'date-fns';
// import { updateTask, deleteTask } from '../../store/taskSlice';

// interface Day {
//   date: string;
//   isCurrentMonth: boolean;
//   isToday?: boolean;
// }

// interface TaskItem {
//   id: string;
//   name: string;
//   category: string;
//   startDate: string;
//   endDate: string;
// }

// const categoryColor = (cat: string) => {
//   switch (cat) {
//     case 'To Do':
//       return 'bg-sky-500';
//     case 'In Progress':
//       return 'bg-amber-500';
//     case 'Review':
//       return 'bg-purple-500';
//     case 'Completed':
//       return 'bg-emerald-600';
//     default:
//       return 'bg-gray-500';
//   }
// };

// const MyCalendar: React.FC = () => {
//   const dispatch = useAppDispatch();

//   const today = new Date();
//   const year = today.getFullYear();
//   const month = today.getMonth();

//   const [days, setDays] = useState<Day[]>([]);
//   const [isSelecting, setIsSelecting] = useState(false);
//   const [startIndex, setStartIndex] = useState<number | null>(null);
//   const [endIndex, setEndIndex] = useState<number | null>(null);

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [startDateStr, setStartDateStr] = useState('');
//   const [endDateStr, setEndDateStr] = useState('');

//   const [readTask, setReadTask] = useState<TaskItem | null>(null);
//   const [editTaskItem, setEditTaskItem] = useState<TaskItem | null>(null);

//   const { tasks, filterCategory, searchQuery } = useAppSelector(
//     (state) => state.tasks
//   );

//   useEffect(() => {
//     const monthStart = startOfMonth(new Date(year, month));
//     const gridStart = startOfWeek(monthStart, { weekStartsOn: 0 });

//     const list: Day[] = [];
//     for (let i = 0; i < 42; i++) {
//       const d = addDays(gridStart, i);
//       list.push({
//         date: format(d, 'yyyy-MM-dd'),
//         isCurrentMonth: d.getMonth() === month,
//         isToday: format(d, 'yyyy-MM-dd') === format(today, 'yyyy-MM-dd'),
//       });
//     }
//     setDays(list);
//   }, [year, month]);

//   const isSelected = (index: number) => {
//     if (startIndex === null || endIndex === null) return false;
//     const a = Math.min(startIndex, endIndex);
//     const b = Math.max(startIndex, endIndex);
//     return index >= a && index <= b;
//   };

//   const handleMouseDown = (index: number, e: React.MouseEvent) => {
//     e.preventDefault();
//     setIsSelecting(true);
//     setStartIndex(index);
//     setEndIndex(index);
//   };

//   const handleMouseEnter = (index: number) => {
//     if (!isSelecting || startIndex === null) return;
//     setEndIndex(index);
//   };

//   const handleMouseUp = () => {
//     if (isSelecting && startIndex !== null && endIndex !== null) {
//       const a = Math.min(startIndex, endIndex);
//       const b = Math.max(startIndex, endIndex);
//       setStartDateStr(days[a].date);
//       setEndDateStr(days[b].date);
//       setIsModalOpen(true);
//     }
//     setIsSelecting(false);
//   };

//   const handleDayClick = (index: number) => {
//     if (isSelecting) return;
//     setStartIndex(index);
//     setEndIndex(index);
//   };

//   useEffect(() => {
//     const onDocMouseDown = (ev: MouseEvent) => {
//       const el = document.getElementById('calendar-grid-container');
//       if (!el) return;
//       if (!el.contains(ev.target as Node)) {
//         setStartIndex(null);
//         setEndIndex(null);
//         setIsSelecting(false);
//       }
//     };
//     document.addEventListener('mousedown', onDocMouseDown);
//     return () => document.removeEventListener('mousedown', onDocMouseDown);
//   }, []);

//   const handleModalClose = () => {
//     setIsModalOpen(false);
//     setStartIndex(null);
//     setEndIndex(null);
//   };

//   const openRead = (task: TaskItem) => setReadTask(task);
//   const closeRead = () => setReadTask(null);

//   const openEdit = (task: TaskItem) => {
//     setReadTask(null);
//     setEditTaskItem(task);
//   };
//   const closeEdit = () => setEditTaskItem(null);

//   const handleSaveEdit = (next: TaskItem) => {
//     dispatch(updateTask(next));
//     setEditTaskItem(null);
//   };

//   const handleDelete = (task: TaskItem) => {
//     const ok = window.confirm(`Delete "${task.name}"? This cannot be undone.`);
//     if (!ok) return;
//     dispatch(deleteTask(task.id));
//     setReadTask(null);
//   };

//   const selectedBgStyle = { backgroundColor: '#bfdbfe', color: '#000' };

//   const filteredTasks = tasks.filter((t) => {
//     const matchCategory =
//       filterCategory === '' ||
//       t.category.toLowerCase() === filterCategory.toLowerCase();
//     const matchSearch =
//       searchQuery.trim() === '' ||
//       t.name.toLowerCase().includes(searchQuery.toLowerCase());
//     return matchCategory && matchSearch;
//   });

//   return (
//     <div
//       id='calendar-grid-container'
//       className='p-4 select-none'
//       onMouseUp={handleMouseUp}
//     >
//       <h2 className='text-2xl font-bold mb-4'>August, 2025</h2>

//       <div className='grid grid-cols-7 bg-gray-100 text-gray-600 font-semibold'>
//         {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
//           <div key={d} className='p-2 text-center border border-gray-300'>
//             {d}
//           </div>
//         ))}
//       </div>

//       <div className='grid grid-cols-7 gap-1 bg-gray-200'>
//         {days.map((day, i) => {
//           const selected = isSelected(i);
//           const dayDate = parseISO(day.date);

//           const tasksForDay = filteredTasks.filter((t) =>
//             isWithinInterval(dayDate, {
//               start: parseISO(t.startDate),
//               end: parseISO(t.endDate),
//             })
//           );

//           return (
//             <div
//               key={day.date}
//               onMouseDown={(e) => handleMouseDown(i, e)}
//               onMouseEnter={() => handleMouseEnter(i)}
//               onClick={() => handleDayClick(i)}
//               style={selected ? selectedBgStyle : undefined}
//               className={`min-h-[120px] p-2 border border-gray-300 flex flex-col cursor-pointer transition-all rounded-md
//                 ${day.isToday ? 'border-2 border-blue-500' : ''}
//                 ${
//                   !day.isCurrentMonth ? 'bg-gray-100 text-gray-400' : 'bg-white'
//                 }
//                 ${selected ? '' : 'hover:bg-gray-50'}
//               `}
//             >
//               <span className='font-bold mb-1 text-sm'>
//                 {day.date.slice(-2)}
//               </span>

//               <div className='flex flex-col gap-1 overflow-hidden'>
//                 {tasksForDay.map((t) => {
//                   const isStart = t.startDate === day.date;
//                   const isEnd = t.endDate === day.date;
//                   const rounded =
//                     (isStart ? 'rounded-l-md ' : 'rounded-none ') +
//                     (isEnd ? 'rounded-r-md ' : 'rounded-none ');

//                   return (
//                     <div
//                       key={t.id}
//                       title={`${t.name} (${t.category}) ${t.startDate} → ${t.endDate}`}
//                       className={`${categoryColor(
//                         t.category
//                       )} text-white text-[11px] ${rounded} px-2 py-1 truncate`}
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         openRead(t);
//                       }}
//                       onMouseDown={(e) => e.stopPropagation()}
//                     >
//                       {t.name}
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       <TaskModal
//         isOpen={isModalOpen}
//         onClose={handleModalClose}
//         startDate={startDateStr}
//         endDate={endDateStr}
//       />

//       <ReadTaskModal
//         task={readTask}
//         onClose={closeRead}
//         onEdit={openEdit}
//         onDelete={handleDelete}
//       />

//       <EditTaskModal
//         task={editTaskItem}
//         onClose={closeEdit}
//         onSave={handleSaveEdit}
//       />
//     </div>
//   );
// };

// export default MyCalendar;

import React, { useEffect, useState } from 'react';
import TaskModal from '../modal/TaskModal';
import ReadTaskModal from '../modal/ReadTaskModal';
import EditTaskModal from '../modal/EditTaskModal';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import {
  format,
  addDays,
  startOfMonth,
  startOfWeek,
  parseISO,
  isWithinInterval,
} from 'date-fns';
import { updateTask, deleteTask } from '../../store/taskSlice';
import type { Task } from '../../types/task';

interface Day {
  date: string;
  isCurrentMonth: boolean;
  isToday?: boolean;
}

const categoryColor = (cat: string) => {
  switch (cat) {
    case 'To Do':
      return 'bg-sky-500';
    case 'In Progress':
      return 'bg-amber-500';
    case 'Review':
      return 'bg-purple-500';
    case 'Completed':
      return 'bg-emerald-600';
    default:
      return 'bg-gray-500';
  }
};

const MyCalendar: React.FC = () => {
  const dispatch = useAppDispatch();

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  const [days, setDays] = useState<Day[]>([]);
  const [isSelecting, setIsSelecting] = useState(false);
  const [startIndex, setStartIndex] = useState<number | null>(null);
  const [endIndex, setEndIndex] = useState<number | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [startDateStr, setStartDateStr] = useState('');
  const [endDateStr, setEndDateStr] = useState('');

  const [readTask, setReadTask] = useState<Task | null>(null);
  const [editTaskItem, setEditTaskItem] = useState<Task | null>(null);

  const { tasks, filterCategory, searchQuery } = useAppSelector(
    (state) => state.tasks
  );

  useEffect(() => {
    const monthStart = startOfMonth(new Date(year, month));
    const gridStart = startOfWeek(monthStart, { weekStartsOn: 0 });

    const list: Day[] = [];
    for (let i = 0; i < 42; i++) {
      const d = addDays(gridStart, i);
      list.push({
        date: format(d, 'yyyy-MM-dd'),
        isCurrentMonth: d.getMonth() === month,
        isToday: format(d, 'yyyy-MM-dd') === format(today, 'yyyy-MM-dd'),
      });
    }
    setDays(list);
  }, [year, month]);

  const isSelected = (index: number) => {
    if (startIndex === null || endIndex === null) return false;
    const a = Math.min(startIndex, endIndex);
    const b = Math.max(startIndex, endIndex);
    return index >= a && index <= b;
  };

  const handleMouseDown = (index: number, e: React.MouseEvent) => {
    e.preventDefault();
    setIsSelecting(true);
    setStartIndex(index);
    setEndIndex(index);
  };

  const handleMouseEnter = (index: number) => {
    if (!isSelecting || startIndex === null) return;
    setEndIndex(index);
  };

  const handleMouseUp = () => {
    if (isSelecting && startIndex !== null && endIndex !== null) {
      const a = Math.min(startIndex, endIndex);
      const b = Math.max(startIndex, endIndex);
      setStartDateStr(days[a].date);
      setEndDateStr(days[b].date);
      setIsModalOpen(true);
    }
    setIsSelecting(false);
  };

  const handleDayClick = (index: number) => {
    if (isSelecting) return;
    setStartIndex(index);
    setEndIndex(index);
  };

  useEffect(() => {
    const onDocMouseDown = (ev: MouseEvent) => {
      const el = document.getElementById('calendar-grid-container');
      if (!el) return;
      if (!el.contains(ev.target as Node)) {
        setStartIndex(null);
        setEndIndex(null);
        setIsSelecting(false);
      }
    };
    document.addEventListener('mousedown', onDocMouseDown);
    return () => document.removeEventListener('mousedown', onDocMouseDown);
  }, []);

  const handleModalClose = () => {
    setIsModalOpen(false);
    setStartIndex(null);
    setEndIndex(null);
  };

  const openRead = (task: Task) => setReadTask(task);
  const closeRead = () => setReadTask(null);

  const openEdit = (task: Task) => {
    setReadTask(null);
    setEditTaskItem(task);
  };
  const closeEdit = () => setEditTaskItem(null);

  const handleSaveEdit = (next: Task) => {
    dispatch(updateTask(next));
    setEditTaskItem(null);
  };

  const handleDelete = (task: Task) => {
    const ok = window.confirm(`Delete "${task.title}"? This cannot be undone.`);
    if (!ok) return;
    dispatch(deleteTask(task.id));
    setReadTask(null);
  };

  const selectedBgStyle = { backgroundColor: '#bfdbfe', color: '#000' };

  const filteredTasks = tasks.filter((t: Task) => {
    const matchCategory =
      filterCategory === '' ||
      t.category.toLowerCase() === filterCategory.toLowerCase();
    const matchSearch =
      searchQuery.trim() === '' ||
      t.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div
      id='calendar-grid-container'
      className='p-4 select-none'
      onMouseUp={handleMouseUp}
    >
      <h2 className='text-2xl font-bold mb-4'>August, 2025</h2>

      <div className='grid grid-cols-7 bg-gray-100 text-gray-600 font-semibold'>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
          <div key={d} className='p-2 text-center border border-gray-300'>
            {d}
          </div>
        ))}
      </div>

      <div className='grid grid-cols-7 gap-1 bg-gray-200'>
        {days.map((day, i) => {
          const selected = isSelected(i);
          const dayDate = parseISO(day.date);

          const tasksForDay = filteredTasks.filter((t) =>
            isWithinInterval(dayDate, {
              start: parseISO(t.startDate),
              end: parseISO(t.endDate),
            })
          );

          return (
            <div
              key={day.date}
              onMouseDown={(e) => handleMouseDown(i, e)}
              onMouseEnter={() => handleMouseEnter(i)}
              onClick={() => handleDayClick(i)}
              style={selected ? selectedBgStyle : undefined}
              className={`min-h-[120px] p-2 border border-gray-300 flex flex-col cursor-pointer transition-all rounded-md
                ${day.isToday ? 'border-2 border-blue-500' : ''}
                ${
                  !day.isCurrentMonth ? 'bg-gray-100 text-gray-400' : 'bg-white'
                }
                ${selected ? '' : 'hover:bg-gray-50'}
              `}
            >
              <span className='font-bold mb-1 text-sm'>
                {day.date.slice(-2)}
              </span>

              <div className='flex flex-col gap-1 overflow-hidden'>
                {tasksForDay.map((t) => {
                  const isStart = t.startDate === day.date;
                  const isEnd = t.endDate === day.date;
                  const rounded =
                    (isStart ? 'rounded-l-md ' : 'rounded-none ') +
                    (isEnd ? 'rounded-r-md ' : 'rounded-none ');

                  return (
                    <div
                      key={t.id}
                      title={`${t.title} (${t.category}) ${t.startDate} → ${t.endDate}`}
                      className={`${categoryColor(
                        t.category
                      )} text-white text-[11px] ${rounded} px-2 py-1 truncate`}
                      onClick={(e) => {
                        e.stopPropagation();
                        openRead(t);
                      }}
                      onMouseDown={(e) => e.stopPropagation()}
                    >
                      {t.title}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <TaskModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        startDate={startDateStr}
        endDate={endDateStr}
      />

      <ReadTaskModal
        task={readTask}
        onClose={closeRead}
        onEdit={openEdit}
        onDelete={handleDelete}
      />

      <EditTaskModal
        task={editTaskItem}
        onClose={closeEdit}
        onSave={handleSaveEdit}
      />
    </div>
  );
};

export default MyCalendar;
