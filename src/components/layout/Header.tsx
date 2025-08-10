import TopBar from '../filters/TopBar';

export default function Header() {
  return (
    <header className='bg-white shadow px-6 py-4 flex justify-between items-center'>
      <h1 className='text-2xl font-bold text-gray-800'>Calendo</h1>
      <TopBar />
    </header>
  );
}
