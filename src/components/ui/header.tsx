import Navigation from './navigation';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';

const Header = () => {
  const [open, setOpen] = useState(false);
  return (
    <header>
      <Image src={'/packyicon2.png'} width={100} height={100} alt={'packy'} />
      <h1 className='absolute text-start left-16 top-2 blur opacity-70'>
        PACKY
      </h1>
      <h1>PACKY</h1>
      <button onClick={() => setOpen(!open)}>☰</button>
      <AnimatePresence>
        {open && (
          <>
            <Navigation onLinkClick={() => setOpen(false)} />
            <motion.div
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className='absolute w-screen h-screen top-16 bg-black bg-opacity-50 backdrop-blur-sm z-10'
            />
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
