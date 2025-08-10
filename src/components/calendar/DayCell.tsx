// src/components/calendar/DayCell.tsx
import React from 'react';

interface DayCellProps {
  date: string;
  inCurrentMonth: boolean;
  onMouseDown?: (date: string) => void;
  onMouseEnter?: (date: string) => void;
  onMouseUp?: (date: string) => void;
}

const DayCell: React.FC<DayCellProps> = ({
  date,
  inCurrentMonth,
  onMouseDown,
  onMouseEnter,
  onMouseUp,
}) => {
  const dayNumber = parseInt(date.split('-')[2], 10);
  return (
    <div
      className={`border border-gray-200 p-1 text-sm cursor-pointer select-none ${
        inCurrentMonth ? 'bg-white' : 'bg-gray-100 text-gray-400'
      }`}
      onMouseDown={() => onMouseDown?.(date)}
      onMouseEnter={() => onMouseEnter?.(date)}
      onMouseUp={() => onMouseUp?.(date)}
    >
      <div className='font-medium'>{dayNumber}</div>
    </div>
  );
};

export default DayCell;
