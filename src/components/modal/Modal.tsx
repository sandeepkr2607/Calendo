import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center'
      onMouseDown={onClose}
    >
      <div className='absolute inset-0 bg-black/40' />
      <div
        className='relative z-10 w-full max-w-md rounded-lg bg-white p-4 shadow-xl'
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className='mb-3 flex items-center justify-between'>
          <h3 className='text-lg font-semibold'>{title ?? ''}</h3>
          <button
            className='rounded p-1 text-gray-500 hover:bg-gray-100'
            onClick={onClose}
          >
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
