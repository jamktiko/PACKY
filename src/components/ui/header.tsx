import Navigation from './navigation';
import { useState } from 'react';

const Header = () => {
  const [open, setOpen] = useState(false);
  return (
    <header>
      <h1 className='absolute blur opacity-70'>PACKY</h1>
      <h1>PACKY</h1>
      <button onClick={() => setOpen(!open)}>☰</button>
      {open && <Navigation />}
    </header>
  );
};

export default Header;
