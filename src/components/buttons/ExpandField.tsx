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
    <li className="m-2 p-4 flex flex-col bg-white w-full h-auto bg-opacity-10 rounded-2xl shadow-md">
      <div className="flex justify-between">
        <div className="flex flex-col">
          {item.image && (
            <Image
              src={item.image}
              alt={item.name}
              width={40}
              height={30}
              className="rounded-lg mb-4"
              objectFit="cover"
            />
          )}
          <strong className="text-lg mb-2">
            {' '}
            {item.link && (
              <Link
                href={item.link}
                target="_blank"
                className="underline hover:text-gray-300"
              >
                {item.name}{' '}
              </Link>
            )}
          </strong>
        </div>
        <div className="flex items-center">
          <button
            onClick={toggleExpand}
            className="text-white font-bold hover:underline"
          >
            {isExpanded ? (
              <>
                <FaAngleUp
                  className="float-right"
                  style={{ width: '30px', height: '30px' }}
                />
              </>
            ) : (
              <>
                <FaAngleDown
                  className="float-right"
                  style={{ width: '30px', height: '30px' }}
                />
              </>
            )}
          </button>
          <input
            type="checkbox"
            className="mr-2 rounded-full"
            style={{ width: '30px', height: '30px' }}
          />
        </div>
      </div>
      {isExpanded && <p className="text-white mb-4">{item.desc}</p>}
    </li>
  );
};

export default ExpandableItem;
