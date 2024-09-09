import Navigation from './navigation';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const Header = () => {
  const [open, setOpen] = useState(false);
  return (
    <header>
      <Image src={'/packyicon1.png'} width={100} height={100} alt={'packy'} />
      <h1 className='absolute text-start left-16 top-2 blur opacity-70'>
        PACKY
      </h1>
      <h1>PACKY</h1>
      <button onClick={() => setOpen(!open)}>☰</button>
      <AnimatePresence>
        {open && <Navigation onLinkClick={() => setOpen(false)} />}
      </AnimatePresence>
    </header>
  );
};

export default Header;
