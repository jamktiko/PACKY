// Create a separate component for the expandable item
import React, { useState, useEffect } from 'react';
import Image from 'next/image'; // Import Image component from Next.js
import { SearchBarProps } from '../../utils/search'; // Import props from search to give data
import Link from 'next/link';
import { FaAngleUp, FaAngleDown } from 'react-icons/fa'; // Icons from react icons

const ExpandableItem: React.FC<{ item: SearchBarProps }> = ({ item }) => {
  // Checking that is expanded open or not and also can set open and close it. Starting with false
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <li
      onClick={toggleExpand}
      className='transition-all m-2 p-2 flex flex-col bg-white w-full max-w-[55rem] h-auto bg-opacity-10 rounded-2xl shadow-md'
    >
      <div className='flex justify-between'>
        <div className='flex flex-row items-center bg-white bg-opacity-20 h-16 rounded-2xl'>
          {item.image && (
            <Image
              src={item.image}
              alt={item.name}
              width={40}
              height={30}
              className='rounded-lg  w-16'
              objectFit='cover'
            />
          )}
          <strong className='text-xl  h-16 flex items-center bg-white bg-opacity-5 rounded-r-2xl'>
            {item.link && (
              <Link
                href={item.link}
                target='_blank'
                className=' text-gray-300 hover:text-white w-40 text-center'
              >
                {item.name}{' '}
              </Link>
            )}
          </strong>
        </div>
        <div className='flex items-center'>
          <button className='text-white font-bold hover:underline'>
            {isExpanded ? (
              <>
                <FaAngleUp
                  className='float-right'
                  style={{ width: '30px', height: '30px' }}
                />
              </>
            ) : (
              <>
                <FaAngleDown
                  className='float-right'
                  style={{ width: '30px', height: '30px' }}
                />
              </>
            )}
          </button>
          <input
            type='checkbox'
            className='mr-2 rounded-full'
            style={{ width: '30px', height: '30px' }}
          />
        </div>
      </div>
      {isExpanded && <p className='text-white mb-4'>{item.desc}</p>}
    </li>
  );
};

export default ExpandableItem;
