import React, { useState, useEffect } from 'react';
import { AppDispatch, RootState } from '@/redux/store/store';
import { fetchLibrary } from '@/redux/reducers/libraryDataReducer';
import { useSelector, useDispatch } from 'react-redux';
import { delay, motion } from 'framer-motion';
import ExpandableItem from '@/components/buttons/ExpandField';
import Loader from '@/components/ui/loader';
import { useFetchCollections } from '@/hooks/useFetchCollections';

const SearchBar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [searchQuery, setSearchQuery] = useState(''); // State for search query

  useFetchCollections();

  // Get librarydata from Redux store
  const librarydata = useSelector(
    (state: RootState) => state.libraryDataReducer.value
  );

  const tutorialModalState = useSelector(
    (state: RootState) => state.tutorialReducer.isOpen
  );

  const [isTutorialModalOpen, setIsTutorialModalOpen] =
    useState(tutorialModalState);

  // Filter data based on the search query
  const filteredlibraryData = librarydata.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  <Loader />;

  const [isLibraryVisible, setIsLibraryVisible] = useState(false);

  // useEffect for handling library visibility, tutorialmodal visibility and fetching data
  useEffect(() => {
    dispatch(fetchLibrary());

    if (tutorialModalState === true) {
      setIsTutorialModalOpen(true);
    } else {
      setIsTutorialModalOpen(false);
    }

    if (!isLibraryVisible) {
      setIsLibraryVisible(true);
    }

    if (isLibraryVisible) {
      const gridButtonElement = document.getElementById('library');
      if (gridButtonElement) {
        window.scrollTo({
          top: Math.abs(0),
          left: Math.abs(0),
          behavior: 'smooth',
        });
      }
    }
  }, [dispatch, tutorialModalState, isLibraryVisible]);

  return (
    <div className='md:flex flex-col origin-center items-center'>
      <h1 className='text-center text-2xl ml-16'>
        Optional: Choose familiar technologies
      </h1>
      {/* Search box to filter by name */}
      <input
        style={{ color: 'gray', backgroundColor: 'black' }}
        type='text'
        placeholder='Search for technologies'
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className='library-search'
        disabled={isTutorialModalOpen}
      />
      {/* Display filtered data or loader */}
      {librarydata.length === 0 ? (
        <Loader />
      ) : (
        <motion.ul
          initial={{ opacity: 0, x: 200 }}
          animate={{ opacity: 1, x: 0 }}
          className='mt-4'
          id='library'
        >
          {filteredlibraryData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.075 }}
            >
              <ExpandableItem key={index} item={item} />
            </motion.div>
          ))}
        </motion.ul>
      )}
    </div>
  );
};

export default SearchBar;
