/* eslint-disable react/no-unescaped-entities */
import { useOutputFetch } from '@/hooks/outputFetch';
import React, { useState } from 'react';

interface AccordionProps {
  title: string;
  description: { [key: string]: string[] };
}

export const AccordionItem = ({ title, description }: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const descriptionText = description
    ? Object.entries(description).flatMap(([key, values]) => {
        let sentence: React.ReactNode;
        switch (key) {
          case 'frontendFramework':
            sentence = (
              <>
                For the frontend, we recommend these frameworks:{' '}
                <span className='text-orange-500 font-normal bg-white bg-opacity-5 rounded-2xl text-center block'>
                  {values.join(', ')}
                </span>
              </>
            );
            break;
          case 'backendFramework':
            sentence = (
              <>
                We suggest using this framework for the backend:{' '}
                <span className='text-cyan-500 font-normal bg-white bg-opacity-5 rounded-2xl text-center block'>
                  {values.join(', ')}
                </span>
              </>
            );
            break;
          case 'api':
            sentence = (
              <>
                For this feature, consider these API's:{' '}
                <span className='text-lime-500 font-normal bg-white bg-opacity-5 rounded-2xl text-center block'>
                  {values.join(', ')}
                </span>
              </>
            );
            break;
          case 'library':
            sentence = (
              <>
                You might find these libraries useful:{' '}
                <span className='text-teal-500 font-normal bg-white bg-opacity-5 rounded-2xl text-center block'>
                  {values.join(', ')}
                </span>
              </>
            );
            break;
          case 'service':
            sentence = (
              <>
                We suggest using these services:{' '}
                <span className='text-fuchsia-500 font-normal bg-white bg-opacity-5 rounded-2xl text-center block'>
                  {values.join(', ')}
                </span>
              </>
            );
            break;
          case 'database':
            sentence = (
              <>
                We suggest using these databases:{' '}
                <span className='text-purple-500 font-normal bg-white bg-opacity-5 rounded-2xl text-center block'>
                  {values.join(', ')}
                </span>
              </>
            );
        }
        return [sentence];
      })
    : null;

  return (
    <div className='my-6 bg-slate-500 bg-opacity-50 w-96 border border-teal-500 rounded-xl'>
      <button
        className='w-full flex justify-between border-b border-inherit bg-black bg-opacity-50'
        onClick={handleToggle}
      >
        <p className='pl-4'>{title}</p>
        <p className='bg-black border border-inherit bg-opacity-50 w-10 h-full rounded-xl'>
          {isOpen ? '-' : '+'}
        </p>
      </button>
      {isOpen && (
        <div className='text-base text-left px-4'>
          {isOpen &&
            descriptionText?.map((sentence, index) => (
              <p className='border-y my-1 font-bold' key={index}>
                {sentence}
              </p>
            ))}
        </div>
      )}
    </div>
  );
};
