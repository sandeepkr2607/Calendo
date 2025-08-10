import React from 'react';
import type { Task } from '../../types/task';

interface ReadTaskModalProps {
  task: Task | null;
  onClose: () => void;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
}

const ReadTaskModal: React.FC<ReadTaskModalProps> = ({
  task,
  onClose,
  onEdit,
  onDelete,
}) => {
  if (!task) return null;

  return (
    <div className='fixed inset-0 flex items-center justify-center z-50'>
      <div className='bg-white p-6 rounded shadow-md w-[320px]'>
        <h2 className='text-xl font-bold mb-4'>Task Details</h2>

        <div className='mb-2'>
          <span className='font-semibold'>Title:</span> {task.title}
        </div>
        <div className='mb-2'>
          <span className='font-semibold'>Category:</span> {task.category}
        </div>
        <div className='mb-2'>
          <span className='font-semibold'>Start Date:</span> {task.startDate}
        </div>
        <div className='mb-4'>
          <span className='font-semibold'>End Date:</span> {task.endDate}
        </div>

        <div className='flex justify-end gap-2'>
          <button
            onClick={onClose}
            className='px-3 py-1 bg-gray-300 rounded hover:bg-gray-400'
          >
            Close
          </button>
          <button
            onClick={() => onEdit(task)}
            className='px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600'
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(task)}
            className='px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600'
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReadTaskModal;
