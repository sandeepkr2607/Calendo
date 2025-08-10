import MyCalendar from './components/calendar/MyCalendar';
import Header from './components/layout/Header';

export default function App() {
  return (
    <div className='h-screen flex flex-col bg-gray-50'>
      <Header />
      <main className='flex-1 p-4 overflow-auto'>
        <MyCalendar />
      </main>
    </div>
  );
}
