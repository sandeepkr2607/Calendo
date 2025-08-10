import { useDispatch, useSelector } from 'react-redux';
import { setFilterCategory, setSearchQuery } from '../../store/taskSlice';
import type { RootState } from '../../store/store';
import type { Category } from '../../types/task';

const categoryList: (Category | '')[] = [
  '',
  'To Do',
  'In Progress',
  'Review',
  'Completed',
];

const TopBar = () => {
  const dispatch = useDispatch();
  const selected = useSelector(
    (state: RootState) => state.tasks.filterCategory
  );
  const search = useSelector((state: RootState) => state.tasks.searchQuery);

  return (
    <div className='flex items-center gap-4 p-2'>
      <div>
        <label className='mr-2 font-medium'>Category:</label>
        <select
          value={selected}
          onChange={(e) => dispatch(setFilterCategory(e.target.value))}
          className='px-3 py-1 rounded border border-gray-300'
        >
          {categoryList.map((cat) => (
            <option key={cat || 'All'} value={cat}>
              {cat || 'All'}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className='mr-2 font-medium'>Search:</label>
        <input
          type='text'
          value={search}
          onChange={(e) => dispatch(setSearchQuery(e.target.value))}
          placeholder='Search tasks...'
          className='px-3 py-1 rounded border border-gray-300'
        />
      </div>
    </div>
  );
};

export default TopBar;
