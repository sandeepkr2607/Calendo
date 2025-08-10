// import React, { useState } from 'react';
// import type { Category } from '../../types/task';
// import { useAppDispatch } from '../../store/hooks';
// import { addTask } from '../../store/taskSlice';
// import { nanoid } from 'nanoid';

// const categoryOptions: Category[] = [
//   'To Do',
//   'In Progress',
//   'Review',
//   'Completed',
// ];

// interface TaskModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   startDate: string;
//   endDate: string;
// }

// const TaskModal: React.FC<TaskModalProps> = ({
//   isOpen,
//   onClose,
//   startDate,
//   endDate,
// }) => {
//   const dispatch = useAppDispatch();
//   const [title, setTitle] = useState('');
//   const [category, setCategory] = useState<Category>('To Do');

//   const handleSave = () => {
//     if (!title.trim()) return;

//     dispatch(
//       addTask({
//         id: nanoid(),
//         title,
//         category,
//         startDate,
//         endDate,
//       })
//     );

//     setTitle('');
//     setCategory('To Do');
//     onClose();
//   };

//   if (!isOpen) return null;

//   return (
//     <div className='fixed inset-0  flex items-center justify-center z-50'>
//       <div className='bg-white p-6 rounded shadow-md w-[320px]'>
//         <h2 className='text-xl font-bold mb-4'>Add Task</h2>

//         <label className='block mb-2'>
//           <span className='text-sm font-medium'>Title</span>
//           <input
//             type='text'
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             className='w-full border px-2 py-1 rounded'
//           />
//         </label>

//         <label className='block mb-4'>
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

// export default TaskModal;

import React, { useState } from 'react';
import type { Category } from '../../types/task';
import { useAppDispatch } from '../../store/hooks';
import { addTask } from '../../store/taskSlice';
import { nanoid } from 'nanoid';
import Modal from './Modal';

const categoryOptions: Category[] = [
  'To Do',
  'In Progress',
  'Review',
  'Completed',
];

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  startDate: string;
  endDate: string;
}

const TaskModal: React.FC<TaskModalProps> = ({
  isOpen,
  onClose,
  startDate,
  endDate,
}) => {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<Category>('To Do');

  const handleSave = () => {
    if (!title.trim()) return;

    dispatch(
      addTask({
        id: nanoid(),
        title,
        category,
        startDate,
        endDate,
      })
    );

    setTitle('');
    setCategory('To Do');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title='Add Task'>
      <label className='block mb-2'>
        <span className='text-sm font-medium'>Title</span>
        <input
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className='w-full border px-2 py-1 rounded'
        />
      </label>

      <label className='block mb-4'>
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
    </Modal>
  );
};

export default TaskModal;
