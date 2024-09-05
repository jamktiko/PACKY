import Navigation from './navigation';
import { useState } from 'react';

const Header = () => {
  const [open, setOpen] = useState(false);
  return (
    <header>
      <h1>PACKY</h1>
      <div className='h-24 w-16 bg-inherit absolute -top-[2.55rem] left-56 rotate-45 border-r border-inherit' />
      <button
        onClick={() => setOpen(!open)}
        className='h-16 w-16 bg-inherit text-3xl absolute top-[0.05rem] left-[15.3rem] rounded-full inline border-black border-8'
      >
        ☰
      </button>
      {open && <Navigation />}
    </header>
  );
};

export default Header;
