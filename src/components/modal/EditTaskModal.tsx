// import React, { useState, useEffect } from 'react';
// import type { Task, Category } from '../../types/task';

// const categoryOptions: Category[] = [
//   'To Do',
//   'In Progress',
//   'Review',
//   'Completed',
// ];

// interface EditTaskModalProps {
//   task: Task | null;
//   onClose: () => void;
//   onSave: (task: Task) => void;
// }

// const EditTaskModal: React.FC<EditTaskModalProps> = ({
//   task,
//   onClose,
//   onSave,
// }) => {
//   const [title, setTitle] = useState('');
//   const [category, setCategory] = useState<Category>('To Do');
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');

//   useEffect(() => {
//     if (task) {
//       setTitle(task.title);
//       setCategory(task.category);
//       setStartDate(task.startDate);
//       setEndDate(task.endDate);
//     }
//   }, [task]);

//   const handleSave = () => {
//     if (!task) return;
//     onSave({
//       ...task,
//       title,
//       category,
//       startDate,
//       endDate,
//     });
//   };

//   if (!task) return null;

//   return (
//     <div className='fixed inset-0  flex items-center justify-center z-50'>
//       <div className='bg-white p-6 rounded shadow-md w-[320px]'>
//         <h2 className='text-xl font-bold mb-4'>Edit Task</h2>

//         <label className='block mb-2'>
//           <span className='text-sm font-medium'>Title</span>
//           <input
//             type='text'
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             className='w-full border px-2 py-1 rounded'
//           />
//         </label>

//         <label className='block mb-2'>
//           <span className='text-sm font-medium'>Category</span>
//           <select
//             value={category}
//             onChange={(e) => setCategory(e.target.value as Category)}
//             className='w-full border px-2 py-1 rounded'
//           >
//             {categoryOptions.map((cat) => (
//               <option key={cat} value={cat}>
//                 {cat}
//               </option>
//             ))}
//           </select>
//         </label>

//         <label className='block mb-2'>
//           <span className='text-sm font-medium'>Start Date</span>
//           <input
//             type='date'
//             value={startDate}
//             onChange={(e) => setStartDate(e.target.value)}
//             className='w-full border px-2 py-1 rounded'
//           />
//         </label>

//         <label className='block mb-4'>
//           <span className='text-sm font-medium'>End Date</span>
//           <input
//             type='date'
//             value={endDate}
//             onChange={(e) => setEndDate(e.target.value)}
//             className='w-full border px-2 py-1 rounded'
//           />
//         </label>

//         <div className='flex justify-end gap-2'>
//           <button
//             onClick={onClose}
//             className='px-3 py-1 bg-gray-300 rounded hover:bg-gray-400'
//           >
//             Cancel
//           </button>
//           <button
//             onClick={handleSave}
//             className='px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600'
//           >
//             Save
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditTaskModal;

import React, { useState, useEffect } from 'react';
import type { Task, Category } from '../../types/task';

const categoryOptions: Category[] = [
  'To Do',
  'In Progress',
  'Review',
  'Completed',
];

interface EditTaskModalProps {
  task: Task | null;
  onClose: () => void;
  onSave: (task: Task) => void;
}

const EditTaskModal: React.FC<EditTaskModalProps> = ({
  task,
  onClose,
  onSave,
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<Category>('To Do');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setCategory(task.category);
      setStartDate(task.startDate);
      setEndDate(task.endDate);
    }
  }, [task]);

  const handleSave = () => {
    if (!task) return;
    onSave({
      ...task,
      title,
      category,
      startDate,
      endDate,
    });
  };

  if (!task) return null;

  return (
    <div className='fixed inset-0 flex items-center justify-center z-50'>
      <div className='bg-white p-6 rounded shadow-md w-[320px]'>
        <h2 className='text-xl font-bold mb-4'>Edit Task</h2>

        <label className='block mb-2'>
          <span className='text-sm font-medium'>Title</span>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='w-full border px-2 py-1 rounded'
          />
        </label>

        <label className='block mb-2'>
          <span className='text-sm font-medium'>Category</span>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as Category)}
            className='w-full border px-2 py-1 rounded'
          >
            {categoryOptions.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </label>

        <label className='block mb-2'>
          <span className='text-sm font-medium'>Start Date</span>
          <input
            type='date'
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className='w-full border px-2 py-1 rounded'
          />
        </label>

        <label className='block mb-4'>
          <span className='text-sm font-medium'>End Date</span>
          <input
            type='date'
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className='w-full border px-2 py-1 rounded'
          />
        </label>

        <div className='flex justify-end gap-2'>
          <button
            onClick={onClose}
            className='px-3 py-1 bg-gray-300 rounded hover:bg-gray-400'
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className='px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600'
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTaskModal;
