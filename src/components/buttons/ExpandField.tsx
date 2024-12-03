import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { SearchBarProps } from '@/utils/interface/searchBarData';
import Link from 'next/link';
import { FaAngleUp } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store/store';
import { toggleCheckbox } from '@/redux/reducers/libraryDataReducer';
import { toggleTutorial } from '@/redux/reducers/tutorialReducer';

const isTutorialTemp = false; //väliaikainen poistetaan kuhan reduceri lähtee toimii
const ExpandableItem: React.FC<{ item: SearchBarProps }> = ({ item }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const isChecked = useSelector(
    (state: RootState) =>
      state.libraryDataReducer.value.find(
        (collection) => collection.name === item.name
      )?.checked
  );

  const tutorialModalState = useSelector(
    (state: RootState) => state.tutorialReducer.isOpen
  );

  const [isTutorialModalOpen, setIsTutorialModalOpen] =
    useState(tutorialModalState);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleCheckboxClick = (name: string) => {
    dispatch(toggleCheckbox(name));
  };

  useEffect(() => {
    if (tutorialModalState === true) {
      setIsTutorialModalOpen(true);
    } else {
      setIsTutorialModalOpen(false);
    }
  }, [tutorialModalState]);

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
              width={60}
              height={50}
              className="rounded-lg max-w-16 max-h-16"
              style={{ objectFit: 'cover' }}
              aria-disabled={isTutorialModalOpen}
            />
          )}
          <strong className="expand-header">
            {item.link && (
              <Link
                href={item.link}
                target="_blank"
                className="expand-text"
                tabIndex={isTutorialModalOpen ? -1 : 0}
              >
                {item.name}
              </Link>
            )}
          </strong>
          <button
            className="text-white font-bold"
            disabled={isTutorialModalOpen}
          >
            <FaAngleUp
              className={`float-right transition-transform ml-2 ${
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
              <motion.p className="text-white mb-4 mt-2 min-h-40">
                {item.desc}
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {/* Apply a top margin to the checkbox instead of vertical centering */}
      <input
        type="checkbox"
        tabIndex={0}
        disabled={isTutorialModalOpen}
        className="mt-[1.5rem] md:mt-[2rem] -ml-16 checkbox-input"
        checked={isChecked}
        onChange={() => handleCheckboxClick(item.name)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleCheckboxClick(item.name);
          }
        }}
      />
    </motion.li>
  );
};

export default ExpandableItem;
