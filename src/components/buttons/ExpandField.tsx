import React, { useState } from 'react';
import Image from 'next/image';
import { SearchBarProps } from '../../utils/search';
import Link from 'next/link';
import { FaAngleUp } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { incrementWeight } from '@/redux/reducers/dataReducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store/store';
import { incrementLibraryWeight } from '@/redux/reducers/libraryDataReducer';

const ExpandableItem: React.FC<{ item: SearchBarProps }> = ({ item }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // function to handle incrementing weight in the store by clicking checkbox
  const handleCheckboxClick = (name: string) => {
    dispatch(incrementWeight(name));
    dispatch(incrementLibraryWeight(name));
  };

  return (
    <motion.li
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-row" // Remove items-center to avoid vertical centering
    >
      <div onClick={toggleExpand} className="expand-container">
        <div className="expand-info">
          {item.image && (
            <Image
              src={item.image}
              alt={item.name}
              width={40}
              height={30}
              className="rounded-lg w-16"
              objectFit="cover"
            />
          )}
          <strong className="expand-header">
            {item.link && (
              <Link href={item.link} target="_blank" className="expand-text">
                {item.name}
              </Link>
            )}
          </strong>
          <button className="text-white font-bold">
            <FaAngleUp
              className={`float-right transition-transform ${
                isExpanded ? 'rotate-180' : ''
              }`}
              style={{ width: '30px', height: '30px' }}
            />
          </button>
        </div>
        <div className="flex items-center"></div>
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{ overflow: 'hidden' }}
            >
              <motion.p className="text-white mb-4 min-h-40">
                {item.desc}
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {/* Apply a top margin to the checkbox instead of vertical centering */}
      <input
        type="checkbox"
        className="mt-[2rem] -ml-16 checkbox-input"
        onClick={() => handleCheckboxClick(item.name)}
      />
    </motion.li>
  );
};

export default ExpandableItem;
function dispatch(arg0: { payload: string; type: 'data/incrementWeight' }) {
  throw new Error('Function not implemented.');
}
