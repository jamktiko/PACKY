import React, { useState } from 'react';

interface AccordionProps {
  title: string;
  description: string;
}

export const AccordionItem = ({ title, description }: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='bg-slate-500 px-6 bg-opacity-50 w-96 border rounded-xl'>
      <button className='w-full flex justify-between' onClick={handleToggle}>
        <p>{title}</p>
        <p className='bg-slate-900 w-10 h-full rounded-xl'>
          {isOpen ? '-' : '+'}
        </p>
      </button>
      {isOpen && <div className='text-base text-left'>{description}</div>}
    </div>
  );
};
